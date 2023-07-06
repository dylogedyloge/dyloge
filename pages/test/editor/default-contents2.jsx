const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Introducing Novel",
        },
      ],
    },
    {
      type: "text",
      text: "\n",
    },
    {
      type: "paragraph",
      attrs: {},
      content: [
        {
          type: "text",
          text: "Novel is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with ",
        },
        // {
        //   "type": "text",
        //   "content": [
        //     {
        //       "type": "text",
        //       "text": "Tiptap"
        //     }
        //   ],
        //   "marks": [
        //     {
        //       "type": "link",
        //       "attrs": {
        //         "href": "https://tiptap.dev/",
        //         "target": "_blank",
        //         "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
        //       }
        //     }
        //   ]
        // },
        {
          type: "text",
          text: " and ",
        },
        // {
        //   "type": "text",
        //   "content": [
        //     {
        //       "type": "text",
        //       "text": "Vercel AI SDK"
        //     }
        //   ],
        //   "marks": [
        //     {
        //       "type": "link",
        //       "attrs": {
        //         "href": "https://sdk.vercel.ai/docs",
        //         "target": "_blank",
        //         "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
        //       }
        //     }
        //   ]
        // },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "text",
      text: "\n",
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "Features",
        },
      ],
    },
    {
      type: "text",
      text: "\n",
    },
    // {
    //   type: "orderedList",
    //   attrs: {
    //     tight: true,
    //     start: 1,
    //   },
    //   content: [
    //     {
    //       type: "text",
    //       text: "\n  ",
    //     },
    //     {
    //       type: "listItem",
    //       attrs: {},
    //       content: [
    //         {
    //           type: "text",
    //           text: "Slash menu & bubble menu",
    //         },
    //       ],
    //     },
    //     {
    //       type: "text",
    //       text: "\n  ",
    //     },
    //     {
    //       type: "listItem",
    //       attrs: {},
    //       content: [
    //         {
    //           type: "text",
    //           text: "AI autocomplete (type ",
    //         },
    //         {
    //           type: "text",
    //           attrs: {},
    //           content: [
    //             {
    //               type: "text",
    //               text: "++",
    //             },
    //           ],
    //           marks: [
    //             {
    //               type: "code",
    //             },
    //           ],
    //         },
    //         {
    //           type: "text",
    //           text: " to activate, or select from slash menu)",
    //         },
    //       ],
    //     },
    //     {
    //       type: "text",
    //       text: "\n  ",
    //     },
    //     {
    //       type: "listItem",
    //       attrs: {},
    //       content: [
    //         {
    //           type: "text",
    //           text: "Image uploads (drag & drop / copy & paste, or select from slash menu)",
    //         },
    //       ],
    //     },
    //     {
    //       type: "text",
    //       text: "\n",
    //     },
    //   ],
    // },
    {
      type: "text",
      text: "\n",
    },
    {
      type: "image",
      attrs: {
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        alt: "banner.png",
        title: "banner.png",
      },
      content: [],
    },
    {
      type: "text",
      text: "\n",
    },
    {
      type: "horizontalRule",
      attrs: {},
      content: [],
    },
    {
      type: "text",
      text: "\n",
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "Learn more",
        },
      ],
    },
    {
      type: "text",
      text: "\n",
    },
    // {
    //   type: "bulletList",
    //   attrs: {
    //     tight: true,
    //   },
    //   content: [
    //     {
    //       type: "text",
    //       text: "\n  ",
    //     },
    //     {
    //       type: "listItem",
    //       attrs: {},
    //       content: [
    //         {
    //           type: "paragraph",
    //           attrs: {},
    //           content: [
    //             {
    //               type: "text",
    //               text: "Check out the ",
    //             },
    //             {
    //               type: "text",
    //               content: [
    //                 {
    //                   type: "text",
    //                   text: "launch video",
    //                 },
    //               ],
    //               marks: [
    //                 {
    //                   type: "link",
    //                   attrs: {
    //                     href: "https://twitter.com/steventey/status/1669762868416512000",
    //                     target: "_blank",
    //                     class:
    //                       "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: "text",
    //       text: "\n  ",
    //     },
    //     {
    //       type: "listItem",
    //       attrs: {},
    //       content: [
    //         {
    //           type: "paragraph",
    //           attrs: {},
    //           content: [
    //             {
    //               type: "text",
    //               text: "Star us on ",
    //             },
    //             {
    //               type: "text",
    //               content: [
    //                 {
    //                   type: "text",
    //                   text: "GitHub",
    //                 },
    //               ],
    //               marks: [
    //                 {
    //                   type: "link",
    //                   attrs: {
    //                     href: "https://github.com/steven-tey/novel",
    //                     target: "_blank",
    //                     class:
    //                       "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: "text",
    //       text: "\n  ",
    //     },
    //     {
    //       type: "listItem",
    //       attrs: {},
    //       content: [
    //         {
    //           type: "paragraph",
    //           attrs: {},
    //           content: [
    //             {
    //               type: "text",
    //               content: [
    //                 {
    //                   type: "text",
    //                   text: "Deploy your own",
    //                 },
    //               ],
    //               marks: [
    //                 {
    //                   type: "link",
    //                   attrs: {
    //                     href: "https://vercel.com/templates/next.js/novel",
    //                     target: "_blank",
    //                     class:
    //                       "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    //                   },
    //                 },
    //               ],
    //             },
    //             {
    //               type: "text",
    //               text: " to Vercel",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: "text",
    //       text: "\n",
    //     },
    //   ],
    // },
    {
      type: "text",
      text: "\n",
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
