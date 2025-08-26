#!/bin/bash
# Automated Android-x86 VM setup for Pop!_OS (GNOME Boxes or virt-manager)
set -e

ISO_URL="https://osdn.net/projects/android-x86/downloads/78069/android-x86_64-9.0-r2.iso/"
ISO_PATH="$HOME/Downloads/android-x86.iso"

# 1. Download Android-x86 ISO
if [ ! -f "$ISO_PATH" ]; then
  echo "Downloading Android-x86 ISO..."
  wget -O "$ISO_PATH" "$ISO_URL"
else
  echo "Android-x86 ISO already exists at $ISO_PATH"
fi

# 2. Install GNOME Boxes and virt-manager
sudo apt update
sudo apt install -y gnome-boxes virt-manager qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
sudo systemctl enable --now libvirtd
sudo usermod -aG libvirt "$USER"

# 3. Print next steps for user
cat <<EOF

========================================
Android-x86 ISO is ready at: $ISO_PATH
GNOME Boxes and virt-manager are installed.

To finish setup:
1. Log out and log back in (to apply group changes).
2. Open GNOME Boxes (recommended) or virt-manager:
   - gnome-boxes
   - virt-manager
3. Create a new VM, select the ISO at $ISO_PATH, and follow the prompts.
4. Boot and install Android-x86 in the VM.

EOF
