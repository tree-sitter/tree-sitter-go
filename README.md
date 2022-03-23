tree-sitter-go
===========================

[![Build/test](https://github.com/tree-sitter/tree-sitter-go/actions/workflows/ci.yml/badge.svg)](https://github.com/tree-sitter/tree-sitter-go/actions/workflows/ci.yml)

A [tree-sitter][] grammar for [Go](https://go.dev/ref/spec).

To change the grammar:

1. Update `grammar.js`.
1. Run `tree-sitter generate` to update the generated files. Redo this step each time you merge.
1. Run `tree-sitter test` to run the tests. Add the `--update` flag to update the expectations if the behavior change is sound.
1. Send the PR for review, including all the updated files.

[tree-sitter]: https://github.com/tree-sitter/tree-sitter
