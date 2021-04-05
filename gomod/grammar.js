// https://golang.org/ref/mod#go-mod-file-grammar
module.exports = grammar({
  name: "gomod",

  extras: ($) => [$.comment, /\s/],

  rules: {
    source_file: ($) => repeat($._directive),

    _directive: ($) =>
      choice(
        $.module_directive,
        $.go_directive,
        $.require_directive,
        $.exclude_directive,
        $.replace_directive,
        $.retract_directive
      ),

    _string_literal: ($) =>
      choice($.raw_string_literal, $.interpreted_string_literal),

    raw_string_literal: ($) => token(seq("`", repeat(/[^`]/), "`")),

    interpreted_string_literal: ($) =>
      seq(
        '"',
        repeat(
          choice(token.immediate(prec(1, /[^"\n\\]+/)), $.escape_sequence)
        ),
        '"'
      ),

    escape_sequence: ($) =>
      token.immediate(
        seq(
          "\\",
          choice(
            /[^xuU]/,
            /\d{2,3}/,
            /x[0-9a-fA-F]{2,}/,
            /u[0-9a-fA-F]{4}/,
            /U[0-9a-fA-F]{8}/
          )
        )
      ),

    _identifier: ($) => token(/[^\s,\[\]]+/),

    _string_or_ident: ($) => choice($._string_literal, $._identifier),

    module_path: ($) => $._string_or_ident,
    go_version: ($) => $._string_or_ident,
    version: ($) => $._string_or_ident,

    module_directive: ($) =>
      seq(
        "module",
        choice($.module_path, seq("(", "\n", $.module_path, "\n", ")"))
      ),

    go_directive: ($) => seq("go", $.go_version, "\n"),

    require_directive: ($) =>
      seq(
        "require",
        choice(
          $.require_spec,
          seq("(", "\n", repeat($.require_spec), ")", "\n")
        )
      ),

    require_spec: ($) => seq($.module_path, $.version, "\n"),

    exclude_directive: ($) =>
      seq(
        "exclude",
        choice(
          $.exclude_spec,
          seq("(", "\n", repeat($.exclude_spec), ")", "\n")
        )
      ),

    exclude_spec: ($) => seq($.module_path, $.version, "\n"),

    replace_directive: ($) =>
      seq(
        "replace",
        choice(
          $.replace_spec,
          seq("(", "\n", repeat($.replace_spec), ")", "\n")
        )
      ),

    replace_spec: ($) =>
      choice(
        seq($.module_path, optional($.version), "=>", $.file_path, "\n"),
        seq(
          $.module_path,
          optional($.version),
          "=>",
          $.module_path,
          $.version,
          "\n"
        )
      ),

    file_path: ($) => $._identifier,

    retract_directive: ($) =>
      seq(
        "retract",
        choice(
          seq("(", "\n", repeat($.retract_spec), ")", "\n"),
          $.retract_spec
        )
      ),

    retract_spec: ($) =>
      seq(
        choice(seq("[", $.version, prec(1, ","), $.version, "]"), $.version),
        "\n"
      ),

    comment: ($) => seq("//", /.*/),
  },
});
