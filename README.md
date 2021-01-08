![License](https://img.shields.io/github/license/Radioh/action-content-overwrite) ![Content Overwrite Actions Status](https://github.com/Radioh/action-content-overwrite/workflows/Build/badge.svg)

# Content overwrite

This Github action will overwrite a file with defined content.
It is useful during CI process when you need to replace all content in a config file or all content in other files.
Content could be stored as a Github Secret.

# Usage

Example using content from a Github secret to overwrite content in test.txt

```yaml
uses: Radioh/action-content-overwrite@v1
with:
  filePath: "./src/test.txt"
  content: ${{ secrets.TEST }}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
