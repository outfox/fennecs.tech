---
title: Add Component
order: 3
outline: [1, 2]
---

# Adding & Removing a Component

::: info You'll be doing this a lot!
It's good practice to add components. It's how stuff gets done!
:::

### :neofox_cute_reach: Adding Components :neofox_hug_haj_heart:

- `Entity.Add<C>()`: Adds a default, plain newable component of type `C` to the entity/entities.
- `Entity.Add<C>(C value)`: Adds a plain component with the specified value of type `C` to the entity/entities.
- `Entity.Add<T>(Entity relation)`: Adds a newable relation component backed by a default value of type `T` to the entity/entities.
- `Entity.Add<R>(R value, Entity relation)`: Adds a relation component backed by the specified value of type `R` to the entity/entities.
- `Entity.Add<L>(Link<L> link)`: Adds an object link component with an object of type `L` to the entity/entities.
