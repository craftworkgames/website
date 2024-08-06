---
id: camera
sidebar_label: Camera
title: Camera
description: A virtual 'camera' to view 
---

import FreehandCamera from './camera.svg'

The purpose of a camera is to provide a quick way show the game world from a different position in space.  The way the camera does this is by using a transformation matrix that changes the way a sprite batch is rendered to the screen.  This allows no movement of objects, and instead, moves the projected image on screen space.

<figure>
    <FreehandCamera />
    <figcaption>
        <small>
            A quick sketch of a virtual camera looking at a scene of a 2D world, from 3 different perspectives; Licensed for free and commercial use.
        </small>
    </figcaption>
</figure>

Currently there is only one camera type, the [`Orthographic Camera`](/docs/features/camera/orthographic-camera/). 

This Class is an abstract class only, use a concrete class like the `Orthographic Camera`, or create your own sub-class.

## Why would you want to use a camera?

The short answer is, to reduce complexity for moving what is displayed on the screen.

When you have a single screen game, there would be no normal reason for a camera.  

However, most games allow you to move around in the game world.  For this there are 2 main ways you could accomplish this.
1. Loop over all objects (enemies, players, tiles, backgrounds) in your game, and move their positions, rotations, and scale them.
1. or... leave them where they are at, but use math (Matrix multiplication) to "project" the sprites to a new location (Camera).

The 2nd option is where the camera object comes in.  The camera follows the player (or another entity), displaying the world around the entity. The world is not moved though, only the entity and the camera move.

## What can you do with the camera?

A camera has manage advantages, here are a few:
1. Move the viewable area with an object (Like the player)
1. Add a zoom effect (Perhaps entering or leaving a building)
1. Add a rotation effect (Perhaps when entering a battle)
1. Change to letterbox (Cinematic) view
1. Create fluid motions with ease following a path

## Further Reading

[Matrix Basics](https://stevehazen.wordpress.com/2010/02/15/matrix-basics-how-to-step-away-from-storing-an-orientation-as-3-angles/)
