export const initialTeams = [
  {
    id: '1',
    title: 'Echoes of Aether',
    category: 'ПРИГОДИ • UNITY',
    genre: 'Пригоди',
    engine: 'Unity',
    description: 'Атмосферна пригода про забуті світи, дослідження та вибір, який змінює історію.',
    neededRole: '2D-художник',
    rolesNeeded: ['2D-художник', 'Саунд-дизайнер'],
    membersCount: 4,
    status: 'Розробка',
    communicationUrl: 'https://t.me/echoes_of_aether',
    ownerId: 'user-demo-1',
    members: [
      { id: 'm1', name: 'Максим Рябак', role: 'Тімлід / C# Розробник', initials: 'МР', isOwner: true },
      { id: 'm2', name: 'Олена Петренко', role: '2D-художник', initials: 'ОП', isOwner: false },
      { id: 'm3', name: 'Дмитро Коваль', role: 'Геймдизайнер', initials: 'ДК', isOwner: false },
      { id: 'm4', name: 'Ігор Бондар', role: 'Саунд-дизайнер', initials: 'ІБ', isOwner: false }
    ]
  },
  {
    id: '2',
    title: 'Pixel Nomads',
    category: 'RPG • GODOT',
    genre: 'RPG',
    engine: 'Godot',
    description: 'Піксельна RPG про маленьку команду мандрівників у великому невідомому світі.',
    neededRole: 'Програміст',
    rolesNeeded: ['Програміст', '3D-художник'],
    membersCount: 3,
    status: 'Ідея',
    communicationUrl: 'https://discord.gg/pixelnomads',
    ownerId: 'user-demo-2',
    members: [
      { id: 'm5', name: 'Анна Сидоренко', role: 'Геймдизайнер', initials: 'АС', isOwner: true },
      { id: 'm6', name: 'Тарас Шевчук', role: 'Художник', initials: 'ТШ', isOwner: false },
      { id: 'm7', name: 'Олег Мельник', role: 'Сценарист', initials: 'ОМ', isOwner: false }
    ]
  },
  {
    id: '3',
    title: 'Cyber Heist',
    category: 'ACTION • UNREAL',
    genre: 'Екшн',
    engine: 'Unreal Engine',
    description: 'Кіберпанк-стелс від першої особи в неоновому мегаполісі 2084 року.',
    neededRole: '3D-художник',
    rolesNeeded: ['3D-художник', 'C++ Програміст'],
    membersCount: 2,
    status: 'Розробка',
    communicationUrl: 'https://t.me/cyberheist_dev',
    ownerId: 'user-demo-3',
    members: [
      { id: 'm8', name: 'Василь Унгурян', role: 'C++ Програміст', initials: 'ВУ', isOwner: true },
      { id: 'm9', name: 'Марина Ткач', role: 'Level Designer', initials: 'МТ', isOwner: false }
    ]
  }
];

export const initialDevelopers = [
  {
    id: 'dev-1',
    initials: 'PD',
    username: '@pixel_dev',
    name: 'Павло Демчук',
    role: 'Програміст',
    roles: ['Програміст', 'Геймдизайнер'],
    skills: ['Unity', 'C#', 'Godot'],
    rating: 87,
    projects: 4,
    availability: 'Вільний'
  },
  {
    id: 'dev-2',
    initials: 'AL',
    username: '@artlena_2d',
    name: 'Олена Левицька',
    role: '2D-художник',
    roles: ['2D-художник'],
    skills: ['Aseprite', 'Photoshop', 'Figma'],
    rating: 92,
    projects: 6,
    availability: 'Шукає проєкт'
  },
  {
    id: 'dev-3',
    initials: 'VU',
    username: '@vasyl_ue',
    name: 'Василь Усенко',
    role: '3D-художник',
    roles: ['Програміст', '3D-художник'],
    skills: ['Unreal', 'C++', 'Blender'],
    rating: 74,
    projects: 2,
    availability: 'Частково зайнятий'
  },
  {
    id: 'dev-4',
    initials: 'SC',
    username: '@soundcraft',
    name: 'Сергій Кравченко',
    role: 'Саунд-дизайнер',
    roles: ['Саунд-дизайнер'],
    skills: ['FMOD', 'Audacity', 'Unity'],
    rating: 81,
    projects: 5,
    availability: 'Вільний'
  },
  {
    id: 'dev-5',
    initials: 'QM',
    username: '@qa_mykola',
    name: 'Микола Захарчук',
    role: 'Тестувальник',
    roles: ['Тестувальник'],
    skills: ['Unity', 'Python', 'Jira'],
    rating: 68,
    projects: 3,
    availability: 'Вільний'
  },
  {
    id: 'dev-6',
    initials: 'DM',
    username: '@designerMax',
    name: 'Максим Резнік',
    role: 'Геймдизайнер',
    roles: ['Геймдизайнер'],
    skills: ['Figma', 'Aseprite', 'Photoshop'],
    rating: 95,
    projects: 7,
    availability: 'Шукає проєкт'
  }
];

export const initialUsers = [
  {
    id: 'user-demo-1',
    email: 'test@example.com',
    password: '$2a$10$w0f02Kq7Rz1Hj02xL3.lqOHP1N0Kk1jH.0Y0uO0P.wQ1sA1jH/9i.',
    username: 'MaxRyabak',
    bio: 'Інді-розробник, люблю Unity та pixel-art.',
    skills: ['Unity', 'C#', 'Game Design'],
    role: 'Програміст'
  }
];
