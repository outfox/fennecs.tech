---
title: For
order: 1
---

# Flexible Query Workloads
#### `Stream<>.For(ComponentAction<>)`
#### `Stream<>.For(EntityComponentAction<>)`
#### `Stream<>.For<U>(U, UniformComponentAction<>)`
#### `Stream<>.For<U>(U, UniformEntityComponentAction<>)`

::: info ENTITY BY ENTITY, ONE BY ONE
Process one work item at a time. Fast, fun, and flexible.
![a fennec eating pizza alone](https://fennecs.tech/img/fennec-for.png)
Call a [`ComponentAction`](Delegates.md#ComponentAction-and-UniformComponentAction) delegate for each Entity in the Query, providing the Components that match the ==Stream Types== as `ref` to the code.  
:::

"**For**" is always there "**For U**"... and _gets it done_ in a quick, predictable, reliable way.  Chances are you can ship your entire game with just this one. Let us know how it went!

### Description
Single-theaded, synchronous Runner Methods on Queries with 1 or more [Stream Types](index.md#stream-types).

A `For`-Runner takes one of the [ComponentActions](Delegates.md) as argument. It's the most flexible runner, and the [EntityComponentAction](Delegates.md) variants will conveniently provide the Entity along with the Component refs, and the [UniformComponentAction](Delegates.md) variants will provide a Uniform data item to the delegate.


The Runner is executed directly on the calling thread. Until the runner returns, the World is in `WorldMode.Deferred`, meaning structural changes are applied once the Runner has finished.

### Basic Syntax

Call a Runner on a Query to have it execute the delegate you're passing in. You may optionally have the Runner pass in a Uniform data item that you can provide.

::: code-group
```cs [For(...) plain]
myStream.For((ref Vector3 velocity) => 
{
    velocity += 9.81f * Vector3.DOWN * Time.deltaTime;
});
```

```cs [For&lt;U&gt;(...) with uniform value]
myStream.For(
    uniform: 9.81f * Vector3.DOWN * Time.deltaTime,  // pre-calculating gravity
    action: static (Vector3 Gdt, ref Vector3 velocity) => 
    {
        velocity += Gdt; // our uniform can have any parameter name
    }
); 
```
```cs [For&lt;U&gt;(...) with uniform tuple]
myStream.For(
    uniform: (9.81f, Vector3.DOWN, Time.deltaTime),
    action: ((float g, Vector3 dir, float dt) uniform, ref Vector3 velocity) => 
    {
        velocity += uniform.g * uniform.dir * uniform.dt;
    } // not as optimal as precalc, but an example how to submit complex tuples
); 
```
:::

### Syntax... with Entity!

Sometimes you want to know about the Entity that you're working on. Usually to make structural changes to it.
It can be passed in as the first parameter, which must be an `in` parameter.

::: code-group
```cs [For(...) plain]
myStream.For((in Entity entity, ref Vector3 position) => 
{
    if (position.y < 0) 
    {
        entity.Despawn(); // splat...
    }
});
```

```cs [For(...) with uniform value]
myStream.For(DateTimeOffset.UtcNow,
    (DateTimeOffset when, in Entity entity, ref Vector3 velocity) => 
    {
        if (position.y < 0) entity.Add<ImpactTime>(when);
    }
); 
```

```cs [For(...) verbose, with uniform value]
myStream.For(
    uniform: DateTimeOffset.UtcNow,
    action: static (DateTimeOffset when, in Entity entity, ref Vector3 velocity) => 
    {
        if (position.y < 0) entity.Add<ImpactTime>(when);
    }
); 
```
------------------------
::: tip :neofox_glasses::neofox_glasses: DOUBLE SUPERNERD PRO TIP
1. The function passed as `ComponentAction` can be `static`, even if they are written as anonymous delegates or lambda expressions! This reduces the allocation of memory for a closure or context to zero in most cases. Consider adding the keyword `static` where you can.

2. Uniforms will improve performance of your worker functions when it comes to reading data "from outside". In our examples, if `Time.deltaTime` would be read from memory, cache, or (heaven forbid) run a getter function for each Entity! Pre-read and pre-calculate values and pass them as uniforms when processing a large number of Entities.
:::

### Performance Considerations in Calling Conventions

Want more nuance? `ComponentActions` can be passed to runners in several ways. Choose based on your preferred code style and desired conciseness. Here's a lineup to compare options.

::: code-group
```cs [🆗 lambda/delegate]
// The classic. Fast to write, fast to execute. Easy!
// 💩 Allocates memory for closure on each call!
myStream.For((ref Vector3 thrust, ref Vector3 velocity) => 
{
    velocity += thrust * Time.deltaTime;
});

// Slightly faster than lambda expression in some benchmarks, but no other upside.
// 💩 Allocates memory for closure on each call!
myStream.For(delegate (ref Vector3 thrust, ref Vector3 velocity) 
{
    velocity += thrust * Time.deltaTime;
});
```

```cs [🥇 static method]
// Fastest, most readable, most refactorable, best code re-use.
// Good when debugging. Awesome for Unit Testing!
// ✅ No additional memory allocation! Use Uniform variant to "capture" values.
myStream.For(Physics.ApplyThrust); 
```

```cs [🥈 static lambda/delegate]
// Fast, very flexible. Use For<U>+uniform delegate to "capture" values.
// ✅ No additional memory allocation! A bit meh to log/debug.
myStream.For(static (ref Vector3 thrust, ref Vector3 velocity) =>
{
    velocity += thrust * Time.deltaTime;
});

// Slightly faster than lambda expression in some benchmarks.
// ✅ No additional memory allocation! But longer syntax.
myStream.For(static delegate (ref Vector3 thrust, ref Vector3 velocity) 
{
    velocity += thrust * Time.deltaTime;
});
```

```cs [🥉 method]
// Named Method means improved readability and code re-use.
// Executes slightly faster than lambda. Best when debugging (this!)
// 💩 Allocates memory for 'this' when passed as a delegate!
myStream.For(this.ApplyThrust); 

```
:::

Don't be afraid to code with a few memory allocations here and there. But when you get around to the optimization stage, your friendly neighborhood **fenn**ecs want you knowing where to eliminate a few extra memory allocs. Or how to make your code *even more* reusable!



### Uniforms, Shmuniforms

Shader programmers are going to love these, but the classical programmer might be scratching their head in wonder and ask: "But why? A lambda is so flexible! The whole universe is my ~~oyster~~ closure."

::: warning :neofox_bongo_down: ALL CONVENTIONS ARE BEAUTIFUL
And yet... don't skimp on static functions just because you need data from your current context! 🦊 Memory allocations can fragment your heap and will slow down your game or simulation. 
:::

But amazingly, a **Uniform** can be anything: a primitive type like `int`, a `struct`, a `class`, and also the new `System.ValueTuple`. The latter makes it possible to capture arbitrary data, and provide it in a readable, named, *and allocation-free* way into your `static` anonymous or named functions, without having to declare a struct somewhere else.

::: tip REMINDER - What was that again?
```cs
// Declaring a uniform as a System.ValueTuple for the win!
myStream.For(
    uniform: (Vector3.DOWN, Time.deltaTime),
    static ((Vector3 gravity, float dt) uniform, ref Vector3 velocity) =>
    {
        velocity += uniform.gravity * uniform.dt;
    }); 
```
:::

You can also make your Uniforms a Mutable reference type, and repeatedly change them in your Action. This is done in the [Numbering](/cookbook/staples/Numbering.md) Staple Recipe's fancy Enumerator and store-bought Enumerator variants, and would work just as well for the Queue version.
