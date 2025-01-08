# NubiPro

## Database Seeding Sequence
Run the following commands in order:

```bash
npx sequelize-cli db:seed --seed 20250108142048-initial-data-category
npx sequelize-cli db:seed --seed 20250108142054-initial-data-game
npx sequelize-cli db:seed --seed 20250108142102-initial-data-gamedetails
npx sequelize-cli db:seed --seed 20250108142116-initial-data-user
npx sequelize-cli db:seed --seed 20250108142122-initial-data-usergame
npx sequelize-cli db:seed --seed 20250108142110-initial-data-gamestatistic
```

Alternatively, you can run all seeds at once:
```bash
npx sequelize-cli db:seed:all
```
