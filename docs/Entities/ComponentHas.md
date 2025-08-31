---
title: Check for Component
order: 5
outline: [1, 2]
---

# Checking for Presence of a Component

::: warning :neofox_flop_blep: This is rarely necessary!
#### The API below is not a primary means to find components in **fenn**ecs. 
A preferable tool to find entities with certain components are [Queries](/docs/Queries/).

An ECS cares little about the individual entity, and so should we all!
:::

### Has Component :neofox_verified:

- `Entity.Has<C>()`: Checks if the entity/entities has a plain component of type `C`.
- `Entity.Has<R>(Entity relation)`: Checks if the entity/entities has a relation component of type `R` with the specified relation.
- `Entity.Has<L>(L linkedObject)`: Checks if the entity/entities has an object link component with the specified linked object.
- `Entity.Has<L>(Link<L> link)`: Checks if the entity/entities has an object link component with the specified link.

All `Has` methods return a boolean value indicating whether the entity/entities has the specified component. Therefore, they can only be at the end of a chain.

Note: The type parameters `C`, `R`, and `L` have constraints to ensure they are non-null and/or class types.
