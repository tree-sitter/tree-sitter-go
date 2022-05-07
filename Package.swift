// swift-tools-version:5.3

import PackageDescription

let package = Package(
    name: "TreeSitterGo",
    platforms: [.macOS(.v10_13), .iOS(.v11)],
    products: [
        .library(name: "TreeSitterGo", targets: ["TreeSitterGo"]),
    ],
    dependencies: [],
    targets: [
        .target(name: "TreeSitterGo",
                path: ".",
                exclude: [
                    "binding.gyp",
                    "bindings",
                    "build",
                    "Cargo.toml",
                    "corpus",
                    "examples",
                    "grammar.js",
                    "LICENSE",
                    "Makefile",
                    "node_modules",
                    "package-lock.json",
                    "package.json",
                    "README.md",
                    "script",
                    "src/grammar.json",
                    "src/node-types.json",
                ],
                sources: [
                    "src/parser.c",
                ],
                resources: [
                    .copy("queries")
                ],
                publicHeadersPath: "bindings/swift",
                cSettings: [.headerSearchPath("src")])
    ]
)
