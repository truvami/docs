---
sidebar_label: CLI / HTTP API
---

# CLI / HTTP API

**Truvami Decoder** is a command-line interface (CLI) tool written in Go for decoding Truvami payloads. This reference implementation supports various payload types, including nomad XS and different tag formats. 🛠️

[Github Repository](https://github.com/truvami/decoder)

## 🎬 Demo

Check out this demo to see Truvami Decoder in action! 👇

![Demo](https://raw.githubusercontent.com/truvami/decoder/main/demo.gif)

## 🌟 Features

- 🔍 **Payload Decoding**: Decode nomad XS, tag S/L, and tag XL payloads with ease.
- 📄 **Flexible Output**: Choose between standard console output and JSON format.
- 🛠️ **Debugging & Verbosity**: Enable debugging and verbose output for detailed insights.

## 📦 Installation

### 🔧 Binaries

You can install the Truvami Decoder binary easily using the following command:

```zsh
# This will install the binary at $(go env GOPATH)/bin/decoder
curl -sSfL https://raw.githubusercontent.com/truvami/decoder/main/install.sh | sh -s -- -b $(go env GOPATH)/bin

# ✅ Verify the installation by checking the help
decoder --help
```

### 🖥️ Windows

For Windows users, you can install the Truvami Decoder binary using Chocolatey:

```powershell
# Install using Chocolatey
choco install Truvami-decoder

# ✅ Verify the installation by checking the help
decoder --help
```

## 🛠️ Usage

Truvami Decoder provides a variety of commands and options to help you decode payloads efficiently. Below is an overview of the available commands and flags.

### 🗂️ Basic Command Structure

```sh
decoder [command] [flags]
```

### 📝 Available Commands

- `completion` - 🖋️ Generate the autocompletion script for the specified shell.
- `help` - ℹ️ Display help information about any command.
- `nomadxs` - 🧩 Decode nomad XS payloads.
- `tagsl` - 🏷️ Decode tag S / L payloads.
- `tagxl` - 🏷️ Decode tag XL payloads.

### 🚩 Global Flags

- `-d, --debug` - 🐛 Display debugging output in the console. (default: false)
- `-h, --help` - ℹ️ Display help information.
- `-j, --json` - 📄 Output the result in JSON format. (default: false)
- `-v, --verbose` - 📢 Display more verbose output in the console. (default: false)

### 💡 Example Usage

```sh
# 🔍 Decode a nomad XS payload with verbose output
decoder nomadxs -v

# 📝 Decode a tag S / L payload and output the result in JSON format
decoder tagsl -j

# 🖋️ Generate autocompletion script for bash
decoder completion bash
```

For more detailed information on each command, use:

```sh
decoder [command] --help
```
