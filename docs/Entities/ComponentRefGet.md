---
title: Read/Write Component
order: 6
outline: [1, 2]
---

# Reading and Writing Components
::: warning :neofox_flop_blep: This is rarely necessary!
#### The API below is not a primary means to read/write components in **fenn**ecs. 

Try to work on one/some/many/all/no Entities and their Components in a row (or at once!) using:
- [Streams](/docs/Streams/)
- [Queries](/docs/Queries/)

Doing it directly through the Entity is *"suboptimal"*, basically painting a house through the mail slot.

Yet... it's fine, even great, to use these every now and then.

#### When to Use `Ref<>` and `Get<>`
Well... somewhat vague, fringe use cases which usually arise while *not inside the context* of a Stream.
- **Serialization**
- **Tests and Debugging**
- **UI event handlers** (and their deplorable ilk)
> ... so *please* feel free to modify a `Birthday` component value in `ProfileSaveButtonClicked` using  
```cs
ref var birthday = ref entity.Ref<Birthday>();
birthday.Date = DateTimePicker.Value;
birthday.Cake = "🍰";
```
> ... we don't want you to go and `Add<UpdateBirthdayRequestComponent>(...)` and wait for your `AssignRequestedBirthdayUpdatesSystem` to come around do its thing. Don't do this to yourself.💙
:::


## Component Reference ("Read / Write")
- `Entity.Ref<T>()`: Get a reference to a component. Go nuts!  
*(within the boundaries of your scope)*

- `Entity.Ref<T>(Entity relation)`: Get a reference to a component backing a relation  
*(lets you reassign the value, but not the relation)*

## Getting Multiple Components of a single backing type
- `Entity.Get<T>(Match match)`: Gets all components matching the expression; e.g. `entity.Get<MyLinkType>(Link.Any)` to get all Linked Objects on this Entity.

## Getting all Components
- `Entity.Components`: Returns an `IReadonlyList<Component>` of all components on the entity. (see [Boxed Components](/docs/Components/Expressions.md#boxed-components) for what's inside)



