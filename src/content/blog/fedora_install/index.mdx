---
title: Fedora 安装记录
description: Fedora 安装及配置记录
date: 2025-05-21
tags: ['Fedora']
authors: ['kinntaku']
image: './banner.png'
---

## 操作环境

天选5Pro锐龙版，FA607PV

Fedora42，KDE

## 系统安装

详见：https://youtu.be/iSyDgIuBDWU?si=bmS0FgBZ9kn_vHtf

创建btrfs子卷的时候，至少创建 `\`，`\home`，`\var\log`，`\var\cache`

选择性创建 `\opt`，会遇到 SELinux 问题，需要操作下方解决方案

华硕用户驱动安装教程：https://asus-linux.org/guides/fedora-guide/

## 软件安装

1. 一般软件

   ```bash
   # 常用软件
   sudo dnf install vlc obs cmake btrfs-assistant code
   # 选择性安装
   sudo dnf install blender steam kdenline wine cmake-gui gimp steam bleachbit rclone pandoc
   ```
2. Flatpak

   ```bash
   # 启用 falthub 软件源
   flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

   # 安装腾讯会议
   flatpak install flathub com.tencent.wemeet
   ```
3. 本地包

   1. miniconda

      ```bash
      # 进到一个保存安装脚本的位置
      cd ~/下载

      # 获取安装脚本
      wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

      chmod 777 ./Miniconda3-latest-Linux-x86_64.sh
      bash Miniconda3-latest-Linux-x86_64.sh
      ```
   2. rpm 包

      | 包名称        | 下载地址                                                    | 备注                                                                                                 |
      | ------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
      | Wechat        | https://linux.weixin.qq.com/                                |                                                                                                      |
      | QQ            | https://im.qq.com/linuxqq/index.shtml                       |                                                                                                      |
      | ClashVerge    | https://github.com/clash-verge-rev/clash-verge-rev/releases | 此软件bug众多，目前使用的 `Clash.Verge-2.4.3+autobuild.1019.a60cab9-1.x86_64` 版本的稳定性可以接受 |
      | WPSOffice     | https://www.wps.cn/product/wpslinux#                        |                                                                                                      |
      | balena-etcher | https://github.com/balena-io/etcher/releases/               | 选择性安装                                                                                           |
      | Pureref       | https://www.pureref.com/download.php                        | 选择性安装，捐赠界面选择 `Costume Amount` 填写 0 即可下载                                          |
      | Chrome        | https://www.google.com/intl/zh-CN/chrome/                   | 拉到最下面，在 `Chrome系列` 中选择 `其他平台` - `Linux` - `64 位 .rpm`                       |

      安装方法


      ```bash
      sudo rpm -ivh xxx.rpm
      ```
   3. AppImage 包

      | 包名称   | 下载地址                                | 备注                           |
      | -------- | --------------------------------------- | ------------------------------ |
      | QQ音乐   | https://y.qq.com/download/download.html | 需要提前安装字体               |
      | LANDrop  | https://landrop.app/                    |                                |
      | Snipaste | https://zh.snipaste.com/                |                                |
      | XnviewMP | https://www.xnview.com/en/xnview-mp/    | 选择性安装，flathub 版本有问题 |

      使用方法：移动到合适位置双击直接运行
   4. cuda 12.8 (https://developer.nvidia.com/cuda-12-8-0-download-archive)

      ```bash
      wget https://developer.download.nvidia.com/compute/cuda/12.8.0/local_installers/cuda-repo-fedora41-12-8-local-12.8.0_570.86.10-1.x86_64.rpm
      sudo rpm -i cuda-repo-fedora41-12-8-local-12.8.0_570.86.10-1.x86_64.rpm
      sudo dnf clean all
      sudo dnf -y install cuda-toolkit-12-8
      ```
   5. 嘉立创

      下载 `Intel/AMD(x64)` 压缩包：https://lceda.cn/page/download?src=index

      解压压缩包

      进入到带有 `install.sh` 的目录

      ```bash
      chmod 777 ./install.sh
      bash install.sh
      ```
   6. STM32CubeMX

      下载 `STM32CubeMX-Lin` 压缩包：https://www.st.com/en/development-tools/stm32cubemx.html

      ```bash
      chmod 777 SetupSTM32CubeMX-6.15.0 # 看情况填名称
      ./SetupSTM32CubeMX-6.15.0
      ```
   7. 解码器：

      ```bash
      sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
      sudo dnf install libavcodec-freeworld gstreamer1-vaapi gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-good-extras gstreamer1-plugins-ugly-free gstreamer1-plugins-bad-free gstreamer1-libav gstreamer1-plugins-bad-freeworld gstreamer1-plugins-ugly gstreamer1-plugin-openh264 pipewire-gstreamer svt-vp9-libs x265 x265-libs
      ```
   8. 其他软件

      1. Davinci Resolve：请使用 `DaVinci-Helper` 安装：https://github.com/H3rz3n/davinci-helper/releases
      2. 百度网盘：Fedora上安装百度网盘难度极大，堪称依赖地狱，如仍需使用请使用 distrobox 安装 deb 版本百度网盘或使用 wine 或者使用 WayDroid 使用安卓版本的百度网盘

## 系统问题

### 无法给子卷 `opt` 创建快照

为 Snapper 创建允许规则

```bash
sudo ausearch -c 'snapperd' --raw | audit2allow -M snapperd_local
sudo semodule -i snapperd_local.pp
```

### 开始菜单中的 vlc 打不开

某些条件下，开始菜单中的 vlc 的命令行参数会加入必须指定文件的参数，打开菜单编辑器删掉即可

### AppImage 无法使用 KDE 的 `自动启动` 开机自启

添加脚本启动

```bash
#!/bin/bash
/home/kinntaku/Software/Snipaste/Snipaste-2.10.8-x86_64.AppImage &
```

### 爆内存

调整 zram ：修改 `/usr/lib/systemd/zram-generator.conf`，调整为 `10386` （16GB）

### 没字体

从 windows 下的 `C:/Windows/Windows/Fonts/` 中复制所有的字体到 fedora 中

在 `设置`-`文字和字体`-`字体管理`-`安装字体文件` 选择复制过来的字体，安装为系统字体

### 防止睡眠中被usb外设唤醒

创建服务文件

```bash
sudo nano /etc/systemd/system/disable-xhc-wakeup.service
```

填写

```bash
[Unit]
Description=Disable all XHC wakeup devices
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/bin/bash -c "grep XHC /proc/acpi/wakeup | awk '{print $1}' | while read dev; do echo $dev | tee /proc/acpi/wakeup; done"
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
```

设置开机自启

```bash
sudo systemctl enable disable-xhc-wakeup.service
```

检查是否启用成功

```bash
#立即启用
sudo systemctl start disable-xhc-wakeup.service

#检查USB设备（XHC）是否变为disabled
cat /proc/acpi/wakeup | grep XHC
```

### 关于 NumLock

#### 开机自动启用小键盘：

`设置` - `键盘` - `键盘` - `NumLock 在开机时的状态` - `打开`

#### 永久启用小键盘：

方案：将小键盘区映射到数字区

安装 `keyd`

```bash
# 启用 COPR 仓库
sudo dnf copr enable alternateved/keyd

# 安装 keyd
sudo dnf install keyd
```

创建配置文件

```bash
sudo mkdir -p /etc/keyd
sudo nano /etc/keyd/default.conf
```

填写下列内容

```bash
[ids]
* = *

[main]
kp0 = 0
kp1 = 1
kp2 = 2
kp3 = 3
kp4 = 4
kp5 = 5
kp6 = 6
kp7 = 7
kp8 = 8
kp9 = 9
kpdot = .
kpenter = enter
```

启用服务

```bash
sudo systemctl enable keyd
sudo systemctl start keyd
```
### 总是锁屏

`设置` - `锁屏` - `自动锁定屏幕` - `不自动锁屏`

### chromium/chrome 打开超链接不是打开网站而是下载网站

在菜单编辑器中加入 `%U` 参数

## 软件设置

### vscode

#### 开始

安装 `Chinese (Simplified) (简体中文) Language Pack`,重启 vscode

#### markdown 以及流程图绘制

新建 vscode 配置文件

安装下列插件

| 扩展名称            | 作用                |
| ------------------- | ------------------- |
| Office Viewer       | 内置 Veditor 编辑器 |
| Draw.io Integration | 多功能绘图软件      |

#### python 开发

新建 vscode 配置文件

安装下列插件

| 扩展名称              | 作用           |
| --------------------- | -------------- |
| Jupyter               |                |
| Path Intellisense     | 路径补全       |
| Remote Development    |                |
| Python Extension Pack |                |
| Image preview         | 预览图片       |
| Edit CSV              |                |
| Draw.io Integration   | 多功能绘图软件 |

1. Segment Anything Model 2 (SAM2) 编译问题：

   需要安装 gcc14 版本，这里使用 conda 解决

   ```bash
   conda install -c conda-forge gcc=14 gxx=14
   export CC=$(which gcc)
   export CXX=$(which g++)

   ```

#### arm 嵌入式开发

安装编译器

```bash
sudo dnf install arm-none-eabi-binutils arm-none-eabi-gcc-cs arm-none-eabi-newlib.noarch openocd
```

新建 vscode 配置文件

安装插件

| 扩展名称             | 作用               |
| -------------------- | ------------------ |
| C/C++ Extension Pack |                    |
| Cortex-Debug         | 调试工具           |
| CMake                |                    |
| CMake-Tools          |                    |
| Hex Editor           | 16进制文件查看工具 |

使用 `STM32CubeMX` 生成项目 格式选择 `Makefile` （这里以 `stm32f103c8t6` 为例）

使用该配置文件打开项目文件夹（确保根目录带有 `Makefile` ）

按下 `Ctrl+Shift+P` 打开面板 输入 `C/C++: Edit Configurations (JSON)`

修改 `.vscode/c_cpp_properties.json`

```json
{
   "configurations": [
      {
         "name": "STM32",
         "includePath": [
               "${workspaceFolder}/**"
         ],
         "defines": [
               "STM32F103xE",
               "USE_HAL_DRIVER"
         ],
         "compilerPath": "/usr/bin/arm-none-eabi-gcc",
         "cStandard": "c11",
         "cppStandard": "c++17",
         "intelliSenseMode": "gcc-arm"
      }
   ],
   "version": 4
}
```

其中 `defines` 中的 `STM32F103xE` 来自 `Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/arm/startup_stm32f103xe.s`


#### latex编写

安装插件

| 扩展名称             | 作用               |
| -------------------- | ------------------ |
| LaTeX |                    |
| LaTeX Workshop||

修改设置项

```json
// 鼠标悬停，预览公式时，支持 boldsymbol 宏
"latex-workshop.hover.preview.mathjax.extensions": [
   "boldsymbol"
],
// 是否启用 IntelliSense，自动补全引用的包中的环境和命令
"latex-workshop.intellisense.package.enabled": true,
// 编译后的文件输出目录
"latex-workshop.latex.outDir": "./tmp",
// 默认编译引擎为上次使用的
"latex-workshop.latex.recipe.default": "lastUsed",
// 预览复杂公式，使用时需要通过 command palette (命令面板) 打开
"latex-workshop.mathpreviewpanel.cursor.enabled": true,
"latex-workshop.latex.recipes": [
   {
   "name": "XeLaTeX",
   "tools": [
      "xelatexmk"
   ]
   },
   {
   "name": "PdfLaTeX",
   "tools": [
      "pdflatexmk"
   ]
   }
],
"latex-workshop.latex.tools": [
   {
   "name": "xelatexmk",
   "command": "latexmk",
   "args": [
      "-synctex=1",
      "-xelatex",
      "-interaction=nonstopmode",
      "-file-line-error",
      "-outdir=%OUTDIR%",
      "%DOC%"
   ],
   "env": {}
   },
   {
   "args": [
      "-synctex=1",
      "-pdf",
      "-interaction=nonstopmode",
      "-file-line-error",
      "-outdir=%OUTDIR%",
      "%DOC%"
   ],
   "command": "latexmk",
   "env": {},
   "name": "pdflatexmk"
   }
],
```

#### vscode 个性化

打开 vscode 设置 点击右上角的 `打开设置（JSON）` 按钮，添加以下内容

```json
"files.autoSave": "afterDelay",
"files.autoGuessEncoding": true,
"workbench.list.smoothScrolling": true,
"editor.cursorSmoothCaretAnimation": "on",
"editor.smoothScrolling": true,
"editor.cursorBlinking": "smooth",
"editor.mouseWheelZoom": true,
"editor.formatOnPaste": true,
"editor.formatOnType": true,
"editor.formatOnSave": true,
"editor.wordWrap": "on",
"editor.guides.bracketPairs": true,
"debug.showBreakpointsInOverviewRuler": true,
```

安装插件

| 插件名称     | 功能         |
| ------------ | ------------ |
| One Dark Pro | 主题         |
| background   | 背景图片插件 |

依次右键这两个插件，点击 `将扩展应用于所有配置文件`

编辑设置JSON，添加以下内容

```json
"background.fullscreen": {
   "images": [
   "你喜欢的背景图片位置"
   ],
   "opacity": 0.075,
   "size": "cover",
   "position": "center",
   "interval": 0,
   "random": false
},
```

### Fcitx输入法

使用rime输入法以及配置万象拼音：

```bash
sudo dnf install fcitx5 fcitx5-chinese-addons fcitx5-rime
```

修改 `/etc/profile` ，添加内容

```
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS=@im=fcitx5
```

注销会话

使用并安装万象拼音：

打开 `https://github.com/amzxyz/rime_wanxiang/releases`

最新的 实时更新的词库更新 中 `base-dicts.zip`

最新的 Rime万象拼音输入方案 中 `rime-wanxiang-base.zip`

下载语法模型：`https://github.com/amzxyz/RIME-LMDG/releases/download/LTS/wanxiang-lts-zh-hans.gram`

下载萌娘词库 `https://github.com/suiginko/moetype/releases`  中最新的 `tone_moe.dict.yaml`

打开 `~/.local/share/fcitx5/rime/`

将 `rime-wanxiang-base.zip` 中带许多 `yaml` 文件的目录解压到此处

将语法模型 `wanxiang-lts-zh-hans.gram` 移动到此处

将 `base-dicts.zip` 中带许多 `yaml` 文件的目录覆盖解压到此处的 `dicts` 文件夹下

将 `tone_moe.dict.yaml` 移动到此处的 `dicts` 文件夹下

修改此目录的 `wanxiang.dict.yaml` 文件

```yaml
import_tables
   ...
   - dicts/tone_moe # 没有.dict.yaml
```

修改此目录的 `default.yaml` 文件，注释掉输入配置切换快捷按键，防止与 `visual studio code` 中控制台启动快捷键冲突

```yaml
switcher:
hotkeys:
   ...
   # - Control+grave 
```

关闭拼音显示： 修改此目录的 `wanxiang.schema.yaml` 文件

```yaml
translator:
   ...
   spelling_hints: 0           # 改为0
```

打开 `设置-键盘-虚拟键盘` 选择 `Fcitx 5` ，点击 `应用`

右键菜单栏的 Fcitx 5 图标，选择 `配置` - `附加组件` - `中州韵` - `预编辑模式` - `不显示`

右键菜单栏的 Fcitx 5 图标，选择 `配置` - `附加组件` - `中州韵` - `切换输入法时的状态` - `清空`

右键菜单栏的 Fcitx 5 图标，选择 `配置` - `全局选项` - `切换和禁用输入法` - `Super+空格`

使用中文输入法时，右键菜单栏的 Fcitx 5 图标，选择  `表情开`

解决打字太快漏字问题：编辑 `~/.config/gtk-3.0/settings.ini` (https://wiki.archlinuxcn.org/wiki/Fcitx5#Xwayland) ：

```ini
[Settings]
...
gtk-im-module = fcitx
```

此时的快捷键

| 快捷键      | 功能                                              |
| ----------- | ------------------------------------------------- |
| Ctrl+e      | 翻译                                              |
| Super+`     | 快捷输入                                          |
| Super+Space | 切换输入法                                        |
| Super+;     | 快速输入，可以输入表情，latex（例如 `\alpha` ） |
| Ctrl+;      | fcitx的剪贴板                                     |
| RightShift  | 切换rime的英文输入法                              |
|`|拆字输入|

右键菜单栏的 Fcitx 5 图标，选择 `配置` - `附加组件` - `经典用户界面` - `主题`　选择 `默认深色`

若使用自定义主题将文件夹放到 `~/.local/share/fcitx5/themes/`

### distrobox

```bash
#要在容器中使用cuda，请安装如下软件
sudo dnf install golang-github-nvidia-container-toolkit

PATH=$PATH:$HOME/.local/podman/bin:$HOME/.local/bin
xhost +si:localuser:$USER

sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

vscode中设置添加

```json
"dev.containers.dockerPath": "podman",
```

使用cuda+ubuntu：

   在 nvidia的 docker 库中找到合适的镜像：https://hub.docker.com/r/nvidia/cuda

   这里以 ubuntu20.04+cuda11.8+cdudnn8 为例

```bash
   distrobox create --name ubuntu2204 --additional-flags "--device nvidia.com/gpu=all" --image docker.io/nvidia/cuda:11.8.0-cudnn8-devel-ubuntu20.04
```

### rclone

挂载 onedrive：https://lug.ustc.edu.cn/planet/2024/05/onedrive-backup-with-rclone/

自动挂载脚本

```bash
#!/bin/bash

REMOTE_NAME="onedrive"

# 填上合适的挂载点
MOUNT_POINT="~/SoftwareConfig/RcloneOnedrive"

mkdir -p "$MOUNT_POINT"

# 静默挂载，不使用 --allow-other
nohup rclone mount "$REMOTE_NAME": "$MOUNT_POINT" \
  --vfs-cache-mode full \
  --vfs-cache-max-size 100M \
  --vfs-cache-max-age 1h \
  --dir-cache-time 72h \
  --poll-interval 15s \
  --umask 002 \
  > /dev/null 2>&1 &
```

### X-Anylabeling

```bash
# 创建 conda 环境
conda create -n x-anylabeling python=3.10 -y
conda activate x-anylabeling

# 安装 torch cuda128 版

# 网速不行也可自行下较大的 whl 包提前安装：https://download.pytorch.org/whl/cu128/torch-2.8.0%2Bcu128-cp310-cp310-manylinux_2_28_x86_64.whl
# pip install -r torch-2.8.0+cu128-cp310-cp310-manylinux_2_28_x86_64.whl

pip install torch==2.8.0 torchvision==0.23.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cu128

# 选择合适存放位置
git clone https://github.com/CVHub520/segment-anything-2
cd segment-anything-2
```

在 `pyproject.toml` 中删除 `"torch>=2.3.1",`

```bash
cd segment-anything-2
pip install -e . -i https://pypi.mirrors.ustc.edu.cn/simple/

# 如果构建失败导致 sam2 目录下没有出现 _C.so 文件可以尝试我的构建脚本，将其放到 segment-anything-2 目录下：
# python build.py

# 如遇到编译器版本不对请使用以下方案
# conda install -c conda-forge gcc=14 gxx=14
# export CC=$(which gcc)
# export CXX=$(which g++)

cd ..
git clone https://github.com/CVHub520/X-AnyLabeling
cd X-AnyLabeling
pip install -r requirements.txt -i http://pypi.mirrors.ustc.edu.cn/simple/ --trusted-host pypi.mirrors.ustc.edu.cn

# 修复 wayland 下 qt.qpa.wayland: Wayland does not support QWindow::requestActivate() 问题（https://github.com/CVHub520/X-AnyLabeling/issues/1145）
python3 ./anylabeling/app.py --qt-platform xcb
```

可以创建一个启动脚本

```bash
#!/bin/bash

# 激活 x-anylabeling 环境
source ~/miniconda3/etc/profile.d/conda.sh
conda activate x-anylabeling

# 填上正确的位置
python3 ~/Document/git_projects/X-AnyLabeling/anylabeling/app.py --qt-platform xcb
```

### labelme

```python
conda create -n labelme python=3.13
conda activate labelme
pip install labelme
```

启动脚本

```bash
#!/bin/bash

# 设置 Qt 平台为 xcb（适用于 X11）
export QT_QPA_PLATFORM=xcb

# 激活 Conda 环境
source ~/miniconda3/etc/profile.d/conda.sh
conda activate labelme

# 启动 labelme
labelme

```

### PDFMathTranslate-next

```bash
conda create -n pdf2zh-next python=3.12
conda activate pdf2zh-next
pip install pdf2zh-next -i https://pypi.mirrors.ustc.edu.cn/simple/
```

启动脚本

```bash
#!/bin/bash

# 激活 Conda 环境
source ~/miniconda3/etc/profile.d/conda.sh
conda activate pdf2zh-next

pdf2zh_next --gui
```

在 `菜单编辑器` 中添加此脚本并在 `高级` 中勾选 `在终端运行`

### chrome

| 浏览器扩展    | 脚本扩展         |
| ------------- | ---------------- |
| Bitwarden     | bilibili视频下载 |
| FireShot      | CSDN Focus       |
| Imagus Reborn |                  |
| 篡改猴        |                  |
| 小舒同学      |                  |

启用硬件解码：加入启动参数，这里核显用来解码，使用AMD

```bash
# Intel
google-chrome --enable-features=AcceleratedVideoDecodeLinuxZeroCopyGL,AcceleratedVideoDecodeLinuxGL,AcceleratedVideoEncoder

# AMD
google-chrome --enable-features=AcceleratedVideoDecodeLinuxZeroCopyGL,AcceleratedVideoDecodeLinuxGL,VaapiIgnoreDriverChecks

# Nvidia
google-chrome --enable-features=AcceleratedVideoDecodeLinuxZeroCopyGL,AcceleratedVideoDecodeLinuxGL,VaapiIgnoreDriverChecks,VaapiOnNvidiaGPUs
```

### Minecraft

下载最新的稳定版HMCL启动器：https://github.com/HMCL-dev/HMCL/releases

创建启动脚本

```bash
#!/bin/bash

# 设置环境变量以使用 NVIDIA 显卡进行渲染
export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia

# 启动 HMCL 并设置 GTK 缩放比例
java -Dglass.gtk.uiScale=1.5 -jar ~/Software/Minecraft/HMCL-3.8.0.304.jar
```

