(
  (comment)* @doc
  .
  (function_declaration
    name: (identifier) @name) @definition.function
  (#strip! @doc "^//\\s*")
  (#set-adjacent! @doc @definition.function)
)

(
  (comment)* @doc
  .
  (method_declaration
    name: (field_identifier) @name) @definition.method
  (#strip! @doc "^//\\s*")
  (#set-adjacent! @doc @definition.method)
)

(call_expression
  function: [
    (identifier) @name
    (parenthesized_expression (identifier) @name)
    (selector_expression field: (field_identifier) @name)
    (parenthesized_expression (selector_expression field: (field_identifier) @name))
  ]) @reference.call

(type_spec
  name: (type_identifier) @name) @definition.type

(type_identifier) @name @reference.type

(function_declaration name: (identifier) @name) @definition.function

(type_declaration (type_spec name: (type_identifier) @name type: (struct_type))) @definition.class

(type_declaration (type_spec name: (type_identifier) @name type: (interface_type))) @definition.interface

(type_declaration (type_spec name: (type_identifier) @name type: [(map_type) (channel_type) (slice_type) (array_type) (pointer_type) (type_identifier)])) @definition.type

(method_declaration receiver: (parameter_list (parameter_declaration type: (pointer_type (type_identifier) @scope))) name: (field_identifier) @name) @definition.method

(method_declaration receiver: (parameter_list (parameter_declaration type: (type_identifier) @scope)) name: (field_identifier) @name) @definition.method

(method_spec name: (field_identifier) @name) @definition.method

(const_declaration (const_spec name: (identifier) @name value: (_) @definition.constant))

(field_declaration name: (field_identifier) @name) @definition.field