---
title: Remove Component
order: 4
outline: [1, 2]
---

# Removing a Component

::: info You'll be doing this a lot!
It's good practice to remove components. It's how stuff gets undone!
:::

### :neofox_hug_haj: `Remove<C>(...)` :neofox_floof_sad_reach:

- `Entity.Remove<C>()`: Removes a plain component of type `C` from the entity/entities.
- `Entity.Remove<R>(Entity relation)`: Removes a relation component of type `R` with the specified relation from the entity/entities.
- `Entity.Remove<L>(L linkedObject)`: Removes an object link component with the specified linked object from the entity/entities.
- `Entity.Remove<L>(Link<L> link)`: Removes an object link component with the specified link from the entity/entities.

All methods return the interface itself (`SELF`), allowing for fluent method chaining.

Note: The type parameters `C`, `T`, `R`, and `L` have constraints to ensure they are non-null and/or class types.

## Interface `IHasComponent`

The `IHasComponent` interface provides methods for checking the presence of components on an entity or set of entities. 
