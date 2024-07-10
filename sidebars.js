////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Defines the sidebar navigation used for the /docs page
/// Each section of the navbar is broken down into it's own object below and then combined into the overall sidebar
/// at the end during the module.export
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Defines the "MonoGame.Extended" sidebar category
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const monogameExtendedCategory = {
  type: 'category',
  label: 'MonoGame.Extended',
  items: [
    {
      type: 'doc',
      id: 'about/introduction'
    },
    {
      type: 'doc',
      id: 'about/principles'
    },
    {
      type: 'doc',
      id: 'about/contributing'
    }
  ]
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Defines the "Getting Started" sidebar category
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const gettingStartedCategory = {
  type: 'category',
  label: 'Getting Started',
  items: [
    {
      type: 'doc',
      id: 'getting-started/installation-monogame'
    },
    {
      type: 'doc',
      id: 'getting-started/installation-kni'
    },
    {
      type: 'doc',
      id: 'getting-started/installation-fna'
    },
  ]
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Defines the "Features" sidebar category. 
/// The "Features" sidebar category is broken down into individual categories below and then combined into the overall
//  "Features" category at the end using the individual categories.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/// "Texture Handling" features category
////////////////////////////////////////////////////////////////////////////////
const textureHandlingCategory = {
    type: 'category',
    label: "Texture Handling",
    items: [
      {
        type: 'doc',
        id: 'features/texture-handling/texture2dregion/texture2dregion'
      },
      {
        type: 'doc',
        id: 'features/texture-handling/texture2datlas/texture2datlas'
      },
      {
        type: 'doc',
        id: 'features/texture-handling/sprite/sprite'
      }        
    ]
};

////////////////////////////////////////////////////////////////////////////////
/// "Texture Handling" features category
////////////////////////////////////////////////////////////////////////////////
const _2dAnimationsCategory = {
  type: 'category',
  label: "2D Animations",
  items: [
    {
      type: 'doc',
      id: 'features/2d-animations/spritesheet/spritesheet'
    },
    {
      type: 'doc',
      id: 'features/2d-animations/animatedsprite/animatedsprite'
    },
  ]
};

////////////////////////////////////////////////////////////////////////////////
/// "Fonts" features category
////////////////////////////////////////////////////////////////////////////////
const fontsCategory = {
  type: 'category',
  label: 'Fonts',
  items: [
    {
      type: 'doc',
      id: 'features/fonts/bitmapfont/bitmapfont'
    }
  ]
}

////////////////////////////////////////////////////////////////////////////////
/// "Input" features category
////////////////////////////////////////////////////////////////////////////////
const inputCategory = {
  type: 'category',
  label: 'Input',
  items: [
    {
      type: 'doc',
      id: 'features/input/keyboardextended/keyboardextended'
    },
    {
      type: 'doc',
      id: 'features/input/mouseextended/mouseextended'
    },
    {
      type: 'doc',
      id: 'features/input/inputlistener/inputlistener'
    }
  ]
}

////////////////////////////////////////////////////////////////////////////////
/// "User Interface" features category
////////////////////////////////////////////////////////////////////////////////
const uiCategory = {
  type: 'category',
  label: 'User Interface',
  items: [
    {
      type: 'doc',
      id: 'features/ui/gum/gum-forms/gum-forms'
    }
  ]
}

const features = {
  type: 'category',
  label: 'Features',
  items: [
    textureHandlingCategory,
    _2dAnimationsCategory,
    fontsCategory,    
    inputCategory,
    uiCategory
  ]
};

module.exports = {
  docs: [
    monogameExtendedCategory,
    gettingStartedCategory,
    features
  ]
};
