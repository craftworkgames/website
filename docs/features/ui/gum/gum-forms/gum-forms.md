---
id: gum-forms
sidebar_label: Gum Forms
title: Gum Forms
description: An example document for gum
---

:::tip[Up to date]
This page is **up to date** for MonoGame.Extended `@mgeversion@`.  If you find outdated information, [please open an issue](https://github.com/craftworkgames/craftworkgames.github.io/issues).
:::
Gum Forms provides a collection of flexible, fully customizable controls which can be added to your project with just a few lines of code. 

Gum includes a number of solutions for UI:

* Gum Forms - a collection of controls such as Button, ListBox, and TextBox. These are typical elements which you might find in other UI libraries such as WPF or .NET MAUI.
* Gum Tool - WYSIWYG editor for creating UI. The Gum tool allows you to visually place both Gum Forms objects and non-interactive elements such as labels, sprites, and nine slices.
* Gum Runtime Library - A NuGet package which includes logic for loading Gum projects and interacting with objects in code.

You can use Gum with the Gum UI tool or code-only. Both approaches are fully supported.

This document provides setup and an introduction to using Gum forms controls purely in code. For full documentation see the [Gum Forms documentation](https://docs.flatredball.com/gum/monogame/gum-forms).

## Setup

Before using Gum, you must add the Gum.MonoGame [nuget package](https://www.nuget.org/packages/Gum.MonoGame) to your project.

Gum Forms uses the following objects for initialization, updating, and drawing:

* GumService - provides defaults, initialization, every-frame logic, and drawing for all forms objects. 
* GraphicalUiElement - the base class for all Gum visual objects. The root is passed to GumService.Update so that it can perform every-frame logic on Forms objects, such as detecting clicks. 

The following code shows a single Gum Forms button in an otherwise empty Game1 class:

```cs
public class Game1 : Game
{
    private GraphicsDeviceManager _graphics;

    // Gum renders and updates using a hierarchy. At least
    // one object must have its AddToManagers method called.
    // If not loading from-file, then the easiest way to do this
    // is to create a ContainerRuntime and add it to the managers.
    ContainerRuntime Root;

    public Game1()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
        // So we can interact with the UI
        IsMouseVisible = true;
    }

    protected override void Initialize()
    {
        var gumProject = MonoGameGum.GumService.Default.Initialize(
            this.GraphicsDevice);

        Root = new ContainerRuntime();
        Root.Width = 0;
        Root.Height = 0;
        Root.WidthUnits = Gum.DataTypes.DimensionUnitType.RelativeToContainer;
        Root.HeightUnits = Gum.DataTypes.DimensionUnitType.RelativeToContainer;
        Root.AddToManagers(SystemManagers.Default, null);


        var button = new Button();
        Root.Children.Add(button.Visual);
        button.X = 50;
        button.Y = 50;
        button.Width = 200;
        button.Height = 50;
        button.Text = "Hello MonoGame.Extended!";
        int clickCount = 0;
        button.Click += (_, _) =>
        {
            clickCount++;
            button.Text = $"Clicked {clickCount} times";
        };
        base.Initialize();
    }

    protected override void Update(GameTime gameTime)
    {
        MonoGameGum.GumService.Default.Update(this, gameTime, Root);
        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.CornflowerBlue);
        MonoGameGum.GumService.Default.Draw();
        base.Draw(gameTime);
    }
}

```

The code above shows how to create a Button and add it to the Root object which controls the layout for all Gum objects. Any Gum Forms object can be added to the Root object.

## Button

The Button is a control providing an event for handling clicks. Button objects can also display Text to the user which can be modified through their Text property.

The following code adds a button which increments every time it is clicked:

```cs
var button = new Button();
Root.Children.Add(button.Visual);
button.X = 0;
button.Y = 0;
button.Width = 200;
button.Height = 50;
button.Text = "Hello MonoGame.Extended!";
int clickCount = 0;
button.Click += (_, _) =>
{
    clickCount++;
    button.Text = $"Clicked {clickCount} times";
};
```

## CheckBox

The CheckBox control provides the ability to display a true/false state and allows the user to toggle the state through clicking.

The following code creates a CheckBox which outputs text whenever it is checked and unchecked:

```cs
var checkBox = new CheckBox();
Root.Children.Add(checkBox.Visual);
checkBox.X = 50;
checkBox.Y = 50;
checkBox.Text = "Checkbox";
checkBox.Checked += (_,_) => Debug.WriteLine($"IsChecked:{checkBox.IsChecked}");
checkBox.Unchecked += (_, _) => Debug.WriteLine($"IsChecked:{checkBox.IsChecked}");
```

## ListBox

The ListBox control provides a scrollable list of ListBoxItems for displaying and selecting from a list.

The following code adds items to a ListBox when a button is clicked. When an item is added, `ScrollIntoView` is called so the item is shown.

```cs
var listBox = new ListBox();
this.Root.Children.Add(listBox.Visual);
listBox.X = 50;
listBox.Y = 50;
listBox.Width = 400;
listBox.Height = 200;

var button = new Button();
this.Root.Children.Add(button.Visual);
button.X = 50;
button.Y = 270;
button.Width = 200;
button.Height = 40;
button.Text = "Add to ListBox";
button.Click += (s, e) =>
{
    var newItem = $"Item @ {DateTime.Now}";
    listBox.Items.Add(newItem);
    listBox.ScrollIntoView(newItem);
};
```

## Slider

The Slider control provides a way for the user to change a value by dragging the slider *thumb*.

The following code creates a Slider which allows the user to select a value between 0 and 30, inclusive.  The `IsSnapToTickEnabled` property results in the value being snapped to the `TickFrequency` value. In this case, the value is used to force whole numbers.

```cs
var slider = new Slider();
this.Root.Children.Add(slider.Visual);
slider.X = 50;
slider.Y = 50;
slider.Minimum = 0;
slider.Maximum = 30;
slider.TicksFrequency = 1;
slider.IsSnapToTickEnabled = true;
slider.Width = 250;
slider.ValueChanged += (_, _) => 
    Debug.WriteLine($"Value: {slider.Value}");
slider.ValueChangeCompleted += (_, _) => 
    Debug.WriteLine($"Finished setting Value: {slider.Value}");
```

## TextBox

The TextBox control allows users to enter a string. It supports highlighting, copy/paste, selection with mouse and keyboard, and CTRL key for performing operations on entire words.

The following code creates two TextBoxes which can be used to test copy/paste.

```cs
var textBox = new TextBox();
this.Root.Children.Add(textBox.Visual);
textBox.X = 50;
textBox.Y = 50;
textBox.Width = 200;
textBox.Height = 34;
textBox.Placeholder = "Placeholder Text...";

var textBox2 = new TextBox();
this.Root.Children.Add(textBox2.Visual);
textBox2.X = 50;
textBox2.Y = 90;
textBox2.Width = 200;
textBox2.Height = 34;
textBox2.Placeholder = "Placeholder Text...";
```
