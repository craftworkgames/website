---
id: collections
title: Collections
sidebar_label: Collections
---

## What is a collection?

A collection is a data structure with functionality built around it.  Think about a collection as a grouping of similar things.  All the enemies in a game, the items in the inventory, the textures being drawn, images in an animation, or bullets on the screen.

Collections are more advanced than a simple array or list, and each one can provide unique functionality.  There are benefits and disadvantages to each collection type.  Don't use a collection without a reason, especially if a simple array or list will suffice.  Make sure the collection you are choosing has a purpose that is advantageous to you and your project.

.NET has many default Collection types (List, Dictionary, Queue, Stack, and many more).  These are a few additional collections.

## Extensions to existing .NET collections

`MonoGame.Extended` contains `Collections` extensions to the C# collections that are useful for game programming.  An [extension](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) in .NET is essentially just adding additional functionality to an existing Type Class, without needing to re-compile the source code for .NET 8.0.  Read more about them in the link above.

## Bag

A `Bag` is an un-ordered array of items with fast `Add` and `Remove` properties.

### Bag Functionality and Behavior
- It is much faster than an array when removing items.
- Takes less space than a linked list.
- Bag will resize itself (grow by 1.5 times current size) only when it needs to.  
- Used space won't shrink after removing elements.
- You can clear the bag.
- Can't sort the bag.
- Order is not preserved.
- Elements are added to the end of the collection.

### Bag Example

The example below creates a new `Bag` of size 3 with type `int`, adds three `integers` to the bag, adds a fourth item, and removes one item. When the fourth item is added this causes a resize of the capacity by 1.5 times the current capacity.

```csharp
var bag = new Bag<int>(3);
bag.Add(4);
bag.Add(8);
bag.Add(15);
// bag is now [4, 8, 15]

bag.Add(16); 
// bag is extended here, capacity is now 4 instead of 3 with items [4, 8, 15, 16]

bag.RemoveAt(1);
// bag is now [4, 16, 15] with a capacity of 4

bag.Remove(4);
// bag is now [15, 16] with a capacity of 4
```

Notice in the example when we removed index position 1 (the second element, value 8) with `RemoveAt`.  When an item is removed the bag will reposition the last element into the removed spot.  This is to prevent us from needing to move every element in the bag.  Meaning, **_do not count on the order of the items in the bag!_** 

This happens again when we use `Remove` to look for a specific VALUE in the bag, and remove that item.  15, the last element is swapped into the removed spot.

## Deque
Represents a collection of objects in which elements can be added to or removed either from the front or back. See [double ended queue](https://en.wikipedia.org/wiki/Double-ended_queue).

### Deque Functionality and Behavior

The front of the queue is the first item removed when you `Pop` an item off (The left of the list), where-as the back is the last item removed with `Pop` (The right of the list).
```
[3, 6, 8, 9, 0, 5, 32]
```

In the above list of elements, the 3 is the back, and the 32 is the front.

### Deque Example
```csharp
var deque = new Deque<int>();
deque.AddToBack(1);
deque.AddToBack(2);
deque.AddToFront(4);
deque.AddToFront(5);
deque.AddToBack(3);

while (deque.Count > 0)
{
    int item = deque.Pop();
    Console.WriteLine(item);
}

```

Result
```
3
2
1
4
5
```


## Keyed Collection (keyedCollection)

`KeyedCollection` is a wrapper around the `Dictionary` class where the key is obtained by a [delegate](https://www.tutorialspoint.com/csharp/csharp_delegates.htm).

This allows you to use a function as the key.  While this could be any function, a good example would be using a property of the class in the collection as the key, like an ID field.

### Keyed Collection Functionality and Behavior

 - The delegate function needs to return a unique value for the key since it will be used as the dictionaries key.
 - Simplify adding an Entity to a dictionary by a key value that's inside the Entity.
 - Provide helper methods to search for items in the collection `TryGetValue`

```csharp
var keyedCollection = new KeyedCollection<int, MyEntity>(e => e.Id);
keyedCollection.Add(new MyEntity {Id = 1, Name = "Player1"});
keyedCollection.Add(new MyEntity {Id = 2, Name = "Player2"});

keyedCollection.TryGetValue(1, out MyEntity entity); // gets Player1
```

## Object Pooling

Pooling of Objects allows reuse of memory for a group of items to avoid Garbage Collection.  These are a bit more advanced, and an entire page is dedicated to them.

More information is in the [Object Pooling](docs/features/object-pooling/object-pooling.md) documentation.

## ObservableCollection

`ObservableCollection<T>` manages an `IList<T>` of items firing `ItemAdded`, `ItemRemoved`, `Clearing`, and `Cleared` events when the collection is changed.

## ListExtensions

Adds `Shuffle(Random)` to all `IList<>` classes.

## DictionaryExtensions

Extends all `Dictionary<>` classes with `GetValueOrDefault(key, default)`.
