## Getting Started

```
npm install -g @ionic/cli
npm i # install dependencies
npm run precommit # set up Git hooks
ionic serve  # runs CRA ionic server
```

## Formatting

Auto linting is enabled on commit as a Git hook using `husky` and `pretty-quick`.

### Configuration

To change what runs on commit update the `pre-commit` file in the `/.husky` directory. To change what files are ignored, update the `.eslintignore` file in the project root.
