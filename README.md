![License](https://img.shields.io/github/license/Radioh/action-content-overwrite) ![Code coverage](/badges/coverage.svg)

# Content overwrite

This action overwrites the content of a file with the content provided in the action.
It is useful for updating files with secrets or other content that should not be stored in the repository.
A common use case is to update a file with the content of a Github secret.

# Inputs

- `filePath` - The path to the file that should be updated
- `content` - The content that should be written to the file

# Usage

Example using content from a Github secret to overwrite content in test.txt

```yaml
uses: Radioh/action-content-overwrite@v2.0
with:
  filePath: "./src/test.txt"
  content: ${{ secrets.TEST }}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
