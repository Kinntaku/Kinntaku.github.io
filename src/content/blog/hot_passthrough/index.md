---
title: Nvidia 独显热直通切换
description: Nvidia 独显热直通切换
date: 2026-4-3
tags: ['Hyprland','Arch']
authors: ['kinntaku']
---


# 验证环境

- 设备型号: 天选5Pro锐龙版, FA607PV

- 硬件规格: 
    
    - CPU: AMD Ryzen 9 7940HX

    - GPU1: NVIDIA GeForce RTX 4060 Max-Q / Mobile

    - GPU2: AMD Radeon 610M

    - RAM: 16G

- 操作系统: ArchLinux (Linux 6.19.11-1-cachyos)

- 登录管理器: greetd, tuigreet-greetd

- 桌面环境: Hyprland (Wayland)

# 安装必要软件

- 虚拟机相关: virt-manager qemu-full libvirt dnsmasq

- 远程桌面: AUR: looking-glass-module-dkms

-  文件传输: rclone

# 显卡配置

1. 确定 nvidia 显卡的文件名称

```bash
ls -l /sys/class/drm/card*/device/driver
ls -l /sys/class/drm/render*/device/driver
```

输出

```bash
lrwxrwxrwx 1 root root 0  4月 8日 00:45 /sys/class/drm/card0/device/driver -> ../../../../bus/pci/drivers/nvidia
lrwxrwxrwx 1 root root 0  4月 8日 00:45 /sys/class/drm/card1/device/driver -> ../../../../bus/pci/drivers/amdgpu
```

以及

```bash
lrwxrwxrwx 1 root root 0  4月 8日 00:32 /sys/class/drm/renderD128/device/driver -> ../../../../bus/pci/drivers/amdgpu
lrwxrwxrwx 1 root root 0  4月 8日 00:32 /sys/class/drm/renderD129/device/driver -> ../../../../bus/pci/drivers/nvidia
```

可以观察到 Nvidia 独显是 `card0` 和 `renderD129`, AMD 核显是 `card1` 和 `renderD218`, **注意, 后续所有步骤都需要用你对应显卡名称以及文件名称代替**

查找 Nvidia 独立显卡的 PCI 地址

```bash
for d in /sys/kernel/iommu_groups/*/devices/*; do 
    n=${d#*/iommu_groups/*}; n=${n%%/*}
    printf 'IOMMU Group %s ' "$n"
    lspci -D -nns "${d##*/}"
done
```

观察输出中

```
IOMMU Group 14 0000:01:00.0 VGA compatible controller [0300]: NVIDIA Corporation AD107M [GeForce RTX 4060 Max-Q / Mobile] [10de:28e0] (rev a1)
IOMMU Group 14 0000:01:00.1 Audio device [0403]: NVIDIA Corporation AD107 High Definition Audio Controller [10de:22be] (rev a1)
```

我的显卡在 Group 14 中, 该 group 包含 Nvidia 独显和 Nvidia 声卡

查看 Nvidia 独显以及同组其他设备的驱动

```bash
lspci -Dk 
```

观察输出中

```
0000:01:00.0 VGA compatible controller: NVIDIA Corporation AD107M [GeForce RTX 4060 Max-Q / Mobile] (rev a1)
	Subsystem: ASUSTeK Computer Inc. Device 3638
	Kernel driver in use: nvidia
	Kernel modules: nouveau, nvidia_drm, nvidia
0000:01:00.1 Audio device: NVIDIA Corporation AD107 High Definition Audio Controller (rev a1)
	Subsystem: ASUSTeK Computer Inc. Device 3638
	Kernel driver in use: snd_hda_intel
	Kernel modules: snd_hda_intel
```

记住该 group 的所有设备的 PCI 地址及对应驱动为 `0000:01:00.0` - `nvidia` 和 `0000:01:00.1` - `snd_hda_intel`

2. 查看当前使用 Nvidia 独显的进程

```bash
sudo fuser -v /dev/nvidia*
sudo fuser -v /dev/dri/card0
sudo fuser -v /dev/dri/renderD129
```

一般会出现桌面, 我们下一步需要让桌面使用 AMD 核显而不是 Nvidia 独显

3, 桌面配置

- Niri

    Niri 的操作较为简单, 仅需修改桌面配置, 添加以下内容, 忽略掉 Nvidia 独显

    ```kdl
    debug {
        ignore-drm-device "/dev/dri/by-path/pci-0000:01:00.0-card"
        ignore-drm-device "/dev/dri/by-path/pci-0000:01:00.0-render"
    }
    ```
- Hyprland 操作较为复杂, 需要使用脚本包装启动

    合适位置创建脚本, 写入以下内容

    ```bash
    #!/bin/sh
    export AQ_DRM_DEVICES=/dev/dri/card1
    export __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json
    exec start-hyprland
    ```

    授予权限

    ```bash
    chmod +x /path/to/your/script
    ```

    编辑 `/etc/greetd/config.toml`

    修改启动脚本

    ```toml
    command = "tuigreet --time --cmd /path/to/your/script"
    ```

继续执行查看独显进程的指令, 发现桌面在输出内容中消失了

# 脱离脚本

```bash
#!/bin/bash

# 卸载 Nvidia 独显
sudo fuser -k -9 /dev/nvidia* 

# 卸载内核模块
sudo rmmod nvidia_drm
sudo rmmod nvidia_modeset
sudo rmmod nvidia_uvm
sudo rmmod nvidia

# 替换为之前记住的驱动名称, 解绑对应驱动
echo "0000:01:00.0" | sudo tee /sys/bus/pci/drivers/nvidia/unbind
echo "0000:01:00.1" | sudo tee /sys/bus/pci/drivers/snd_hda_intel/unbind 

# 加载 vfio 模块
sudo modprobe vfio-pci

# 替换为之前记住的驱动名称, 绑定对应驱动到 vfio
echo "vfio-pci" | sudo tee /sys/bus/pci/devices/0000:01:00.0/driver_override
echo "vfio-pci" | sudo tee /sys/bus/pci/devices/0000:01:00.1/driver_override

# 替换为之前记住的驱动名称, 重新探测 PCI 设备, 让主机放弃硬件控制权
echo "0000:01:00.0" | sudo tee /sys/bus/pci/drivers_probe
echo "0000:01:00.1" | sudo tee /sys/bus/pci/drivers_probe

# 检测显卡是否脱离主机, 没有输出即正常
lspci -k | grep -A 2 -i nvidia
```

# 回归脚本

```bash
#!/bin/bash

# 替换为之前记住的驱动名称, 移除对应驱动覆盖
echo "" | sudo tee /sys/bus/pci/devices/0000:01:00.0/driver_override
echo "" | sudo tee /sys/bus/pci/devices/0000:01:00.1/driver_override

# 替换为之前记住的驱动名称, 对应驱动解绑 vfio
echo "0000:01:00.0" | sudo tee /sys/bus/pci/drivers/vfio-pci/unbind
echo "0000:01:00.1" | sudo tee /sys/bus/pci/drivers/vfio-pci/unbind

# 加载内核模块
sudo modprobe nvidia
sudo modprobe nvidia_drm
sudo modprobe nvidia_modeset
sudo modprobe nvidia_uvm

# 替换为之前记住的驱动名称, 重新激活对应驱动
echo "0000:01:00.0" | sudo tee /sys/bus/pci/drivers_probe
echo "0000:01:00.1" | sudo tee /sys/bus/pci/drivers_probe
```

# LookingGlass 配置

**注意: 以下方案会使得 VirtIO 的虚拟磁盘失效, 传输文件请使用 SMB**

**本教程使用 kvmfr 方案, 为官方推荐的方案, 更加稳定, 性能更好, 但是会导致无法使用 VirtIO 虚拟磁盘, 另一种方案是使用 shmem 标准内存共享, 可以使用 VirtoIO 虚拟磁盘**

### 主机配置

加入 kvm 组

```bash
sudo gpasswd -a $USER kvm 
```

注销

计算所需内存大小

$$\frac{分辨率宽 \times 分辨率高 \times 4 \times 2}{1024 \times 1024}$$

一般来说

|分辨率|刷新率|内存大小(MB)|
|---|---|---|
|1080p|非高刷|32|
|1080p / 2K|高刷|64|
|2K|超高刷|128|
|4K|高刷|128|

创建 `/etc/modprobe.d/kvmfr.conf`, 填写你需要的内存大小

```
options kvmfr static_size_mb=128
```

创建 `/etc/modules-load.d/kvmfr.conf`, 创建 Systemd 加载, 填写

```
kvmfr
```

编辑 `/etc/udev/rules.d/99-kvmfr.rules`, 设置权限

```
SUBSYSTEM=="kvmfr", OWNER="你的用户名", GROUP="kvm", MODE="0660"
```

编辑 `/etc/libvirt/qemu.conf` 取消注释 `cgroup_device_acl`, 并在类标末尾添加 `/dev/kvmfr0`, 注意逗号

```
cgroup_device_acl =[
    ...
    "/dev/kvmfr0"
]
```

**重启**

检验

```
sudo dmesg | grep kvmfr
# 输出 kvmfr: creating 1 static device

ls -l /dev/kvmfr0
# 文件权限为 你的用户名 kvm
```

# 镜像准备

1. Windows 镜像

    **经测试, Windows LTSC 2021 版本在后续虚拟显示器配置存在较大问题, 因此不建议使用 LTSC, LTSB 以及 Windows Server 系列!** 
    
    这里使用的镜像为 Windows 10 最后一个大版本更新 22H2 版本, 测试没有问题, 可以通过 [NEXT,ITELLYOU](next.itellyou.cn) 下载, 这里顺便提供 BT 地址:

    ```
    magnet:?xt=urn:btih:aed8ca03ed278466c4a35d509bf864051b533011&dn=zh-cn_windows_10_business_editions_version_22h2_updated_oct_2025_x64_dvd_d4e92df7.iso&xl=6985566208
    ```

2. Virtio 驱动
    
    [下载地址](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/) 
    
    下载最新版本的 ISO 镜像

3. Nvidia APP
    
    [下载地址](https://www.nvidia.cn/software/nvidia-app/)

5. Virtual Display Driver

    [下载地址](https://github.com/VirtualDrivers/Virtual-Display-Driver/releases)

    下载最新的 `VDD.Control.25.7.23.zip` 即可

4. Looking Glass

    [下载地址](https://looking-glass.io/downloads) 
    
    选择 Windows 客户端, 注意 `Windows Host Binary` 是可以点击的, 点击即可下载, 
    
    **注意和主机的版本匹配, Official/Stable 对应 looking-glass-module-dkms, Bleeding Edge 对应 looking-glass-module-dkms-git!**

上述 1, 2 项自身为 ISO 镜像, 可以把其余项打包成 ISO 镜像, 方便后续安装

```bash
xorrisofs -o 镜像名称.iso 文件列表
```

然后把你的所有 ISO 文件放置到同一目录下

# 创建虚拟机

开启 kvm 守护进程

```bash
sudo systemctl enable --now libvirtd
```

开启网络

```bash
sudo virsh net-start default
sudo virsh net-autostart default
```

打开 `Virtual Machine Manager`

`编辑` - `首选项` - `常规` - `启用 XML 编辑`

1. 存储池创建

    KVM 主页 - 编辑 - 连接详情 - 存储 - 创建存储池

    类型: dir: 文件系统目录 (默认)

    目标路径: 选择你 ISO 文件所在目录


2. 创建虚拟机

    KVM 主页 - 创建新虚拟系统

    选择如何安装操作系统: 本地安装介质 (ISO 映像或者光驱) (默认)

    选择 ISO 或 CDROM 安装介质: 浏览 - 选择你刚才添加的存储池 - 选择系统 ISO 镜像

        注: 要是不显示可以点击刷新按钮

    请选择要安装的操作系统: Microsoft Windows 10

    内存; CPU 数: 这里我选择 8192 和 16 

    为虚拟机启用存储 - 为虚拟机创建磁盘镜像: 我这里选择 60 

    在安装前自定义配置: 开

    选择网络: 虚拟网络 'default': NAT (默认)

3. 编辑虚拟机

    1. 概况

        芯片组: Q35 (默认)

        固件: UEFI

    2. CPU 数

        手动设置 CPU 拓扑: 开

        **以下内容根据自己 CPU 调整**

        插槽: 1

        核心: 8

        线程: 2

    3. 内存

        启用共享内存: 开

    4. SATA 磁盘 1

        磁盘总线: VirtIO

    5. 显示协议
        
        类型: Spice 服务器
    
        监听类型: 地址
        
        地址: 虚拟机管理程序默认 (默认)

        端口 - 自动: 开 (默认)

        OpenGL - 关 (默认)

    6. 显卡

        型号: QXL


4. 添加设备

    1. 存储

        选择或创建自定义存储 - 选择你之前创建的存储池 - 依次添加你的 Virto 驱动镜像和打包的工具镜像

    2. 输入

        依次添加 VirtIO 键盘, VirtIO 绘图板

        修改 VirtIO 绘图板的 xml, 将 tablet 修改为 mouse, 点击应用

    3. PCI主机设备

        依次选择 group 中的 **所有** 设备添加

5. XML 编辑

    编辑虚拟机的 `概况` - `xml` 
    
    **注意, 下面修改1, 3必须都修改完毕后再点击 `应用` 按钮!**

    ```xml
    <!-- 修改1: 编辑 domin 标签头部, 添加 namespace -->
    <domain type='kvm' xmlns:qemu='http://libvirt.org/schemas/domain/qemu/1.0'>

        ...

        <devices>
            
            ...

            <!-- 修改2: 修改 memballon 为 none, 可以提升内存性能 -->
            <memballoon model="none"/>
        </devices>

        <!-- 修改3: 在 domin 标签末尾添加以下内容 -->
        <qemu:commandline>
        <qemu:arg value="-device"/>
        <qemu:arg value="{'driver':'ivshmem-plain','id':'shmem0','memdev':'looking-glass'}"/>
        <qemu:arg value="-object"/>
        <qemu:arg value="{'qom-type':'memory-backend-file','id':'looking-glass','mem-path':'/dev/kvmfr0','size':134217728,'share':true}"/>
        </qemu:commandline>
    </domain>

    ```

# windows 配置

1. 安装准备好的 Nvidia APP 并安装驱动程序

2. 安装准备好的 Virtual Display Driver

    解压压缩包到任意位置, 运行其中的 `VDD Control.exe` 

    点击下面绿色的 `Install Driver` 按钮, 等待安装完成

    观察设备管理器中的显示适配器, 出现 `Virtual Display Driver` 便安装成功

    打开 设置 - 系统 - 显示, 点击显示器 2
    
        设置为主显示器 - 勾选

        多显示器设置 - 仅在屏幕 2 上显示

3. 安装 Looking Glass 客户端

    解压压缩包, 运行其中的 `looking-glass-host-setup.exe` 安装程序

4. 网络共享设置

    在宿主机运行

    `ip a` 查看虚拟网桥地址, 例如

    ```
    4: virbr0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc htb state DOWN group default qlen 1000
    link/ether 52:54:00:13:8d:c9 brd ff:ff:ff:ff:ff:ff
    inet 192.168.122.1/24 brd 192.168.122.255 scope global virbr0
       valid_lft forever preferred_lft forever
    ```

    我的虚拟网桥地址为 `192.168.122.1`

    ```bash
    rclone serve webdav 你要共享的目录 \
        --addr 192.168.122.1:8080 \ # 替换为你的虚拟网桥地址
        --vfs-cache-mode full
    ```

    在 Windows 的合适目录下创建快捷方式, 填写 `\\192.168.122.1@8080\DavWWWRoot` 记得将地址和端口替换为你自己的, `DavWWWRoot` 代表根目录, 是固定写法

### 使用 Looking Glass

```
looking-glass-client -m 100
```
默认穿透按键为 CapsLock 按键

`-m` 指定穿透按键, 按下后会将键盘和鼠标交给虚拟机, 再按下后会归还到主机, 100 为右 ALT 按键
