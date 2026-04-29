# Як виноситься реліз

Поточна версія в `main` — це версія **майбутнього релізу**.

Наприклад, в `main` стоїть `26.4` — це означає що наступний реліз буде `26.4`.

### Послідовність

1. Переконатись що `main` актуальний
```bash
   git checkout main
   git pull origin main
```

2. Створити release-гілку від `main`
```bash
   git checkout -b v26.4
   git push -u origin v26.4
```

3. Повернутись в `main` і змінити версію на наступну
```bash
   git checkout main
   # змінити версію в package.json на 26.6
   git add package.json package-lock.json
   git commit -m "chore: bump version to 26.6"
   git push origin main
```

4. Поставити тег на release-гілці
```bash
   git checkout v26.4
   git tag v26.4-tagged
   git push origin v26.4-tagged
```

5. Створити GitHub Release з changelog

> [!TIP]
> Кроки 2-5 виконуються автоматично екшном [Make Release](../use-actions/Readme.md)
