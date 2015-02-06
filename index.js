function renameRequire(expr) {
	if(expr.type === 'FunctionDeclaration' || expr.type === 'FunctionExpression') {
		Object.keys(expr.params).forEach(function(key) {
			if(expr.params[key].name === 'require') {
				expr.params[key].name = '__REPLACED_REQUIRE__';
			}
		});
	}
	if(expr.type === 'ExpressionStatement') {
		renameRequire(expr.expression);
	}
	if(expr.type === 'UnaryExpression') {
		renameRequire(expr.argument);
	}
	if(expr.type === 'CallExpression') {
		Object.keys(expr.arguments).forEach(function(key) {
			renameRequire(expr.arguments[key]);
		});
	}
}

function UMDRequirePlugin() {
}
module.exports = UMDRequirePlugin;
UMDRequirePlugin.prototype.apply = function(compiler) {
	compiler.parser.plugin('statement', renameRequire);
};
