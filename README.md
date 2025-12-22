# Case Converter

**Автор:** Маслов Денис Владимирович, группа М3101  
**GitHub:** [azimov21](https://github.com/azimov21)

## Описание
Плагин для Visual Studio Code, который преобразует выделенный текст между различными стилями именования:
- **snake_case**
- **camelCase**
- **PascalCase**

## Установка
1. Скачайте `.vsix` файл
2. В VS Code: `Ctrl+Shift+P` → `Extensions: Install from VSIX...`
3. Выберите файл `case-converter-1.0.0.vsix`

## Использование
1. Выделите текст в редакторе
2. Выберите один из способов:
   - **Через контекстное меню:** Правая кнопка мыши → выберите нужный стиль
   - **Через Command Palette:** `Ctrl+Shift+P` → введите название команды

## Доступные команды
- `Convert to snake_case`
- `Convert to camelCase`
- `Convert to PascalCase`

## Примеры
| Исходный текст | snake_case | camelCase | PascalCase |
|----------------|------------|-----------|------------|
| `hello world`  | `hello_world` | `helloWorld` | `HelloWorld` |
| `test-variable` | `test_variable` | `testVariable` | `TestVariable` |
| `UserProfile`  | `user_profile` | `userProfile` | `UserProfile` |

## Тестирование
1. Откройте папку проекта в VS Code
2. Нажмите `F5` для запуска тестового окна
3. Проверьте работу плагина в новом окне