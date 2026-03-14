### GitHub Push 脚本使用说明

由于当前环境无法直接通过 HTTPS 推送到 GitHub（需要认证），请按以下方式操作：

#### 方式一：使用 GitHub CLI（推荐）
```bash
# 安装 GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh -y

# 登录 GitHub
gh auth login
# 按提示选择：GitHub.com → Web browser → Yes → Copy code → 网页粘贴

# 推送
cd /home/zgc/.openclaw/workspace-xiaozhi
git push origin main
```

#### 方式二：本地生成 diff，你复制粘贴到 GitHub Web UI
`git diff HEAD~1 > /tmp/latest-change.diff`
你把 diff 复制到 GitHub 的 Pull Request 或直接编辑文件

#### 方式三：生成独立可运行的 index.html（临时测试用）
我可以把所有 JS 内联到一个文件里，你直接 copy 到 GitHub 仓库

---

你选哪个方式？我建议用 GitHub CLI（方式一），安全又方便。