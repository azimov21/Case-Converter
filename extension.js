const vscode = require('vscode');

/**
 * Функция для разделения текста на слова
 * @param {string} text - Входной текст
 * @returns {string[]} Массив слов
 */
function splitWords(text) {
    // Разделяем по разным разделителям: пробел, подчеркивание, дефис, заглавные буквы
    return text.split(/(?=[A-Z])|[\s_\-]+/).filter(word => word.length > 0);
}

/**
 * Преобразует текст в snake_case
 * @param {string} text - Входной текст
 * @returns {string} Текст в snake_case
 */
function toSnakeCase(text) {
    const words = splitWords(text);
    return words.map(word => word.toLowerCase()).join('_');
}

/**
 * Преобразует текст в camelCase
 * @param {string} text - Входной текст
 * @returns {string} Текст в camelCase
 */
function toCamelCase(text) {
    const words = splitWords(text);
    if (words.length === 0) return '';
    
    const firstWord = words[0].toLowerCase();
    const otherWords = words.slice(1).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    
    return firstWord + otherWords.join('');
}

/**
 * Преобразует текст в PascalCase
 * @param {string} text - Входной текст
 * @returns {string} Текст в PascalCase
 */
function toPascalCase(text) {
    const words = splitWords(text);
    return words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
}

/**
 * Основная функция преобразования
 * @param {string} conversionType - Тип преобразования
 */
async function convertText(conversionType) {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found!');
        return;
    }
    
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    
    if (!text) {
        vscode.window.showErrorMessage('No text selected!');
        return;
    }
    
    let convertedText;
    
    switch(conversionType) {
        case 'snake':
            convertedText = toSnakeCase(text);
            break;
        case 'camel':
            convertedText = toCamelCase(text);
            break;
        case 'pascal':
            convertedText = toPascalCase(text);
            break;
        default:
            vscode.window.showErrorMessage('Invalid conversion type!');
            return;
    }
    
    // Заменяем выделенный текст
    await editor.edit(editBuilder => {
        editBuilder.replace(selection, convertedText);
    });
    
    vscode.window.showInformationMessage(`Converted to ${conversionType} case!`);
}

/**
 * Активация расширения
 * @param {vscode.ExtensionContext} context - Контекст расширения
 */
function activate(context) {
    console.log('Case Converter extension is now active!');
    
    // Регистрация команд
    const snakeCaseCommand = vscode.commands.registerCommand('case-converter.toSnakeCase', () => {
        convertText('snake');
    });
    
    const camelCaseCommand = vscode.commands.registerCommand('case-converter.toCamelCase', () => {
        convertText('camel');
    });
    
    const pascalCaseCommand = vscode.commands.registerCommand('case-converter.toPascalCase', () => {
        convertText('pascal');
    });
    
    // Добавление команд в контекст
    context.subscriptions.push(snakeCaseCommand, camelCaseCommand, pascalCaseCommand);
}

/**
 * Деактивация расширения
 */
function deactivate() {}

module.exports = {
    activate,
    deactivate,
    toSnakeCase,
    toCamelCase,
    toPascalCase
};