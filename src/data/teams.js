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
    ownerId: 'user-1',
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
    ownerId: 'user-2',
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
    ownerId: 'user-3',
    members: [
      { id: 'm8', name: 'Василь Унгурян', role: 'C++ Програміст', initials: 'ВУ', isOwner: true },
      { id: 'm9', name: 'Марина Ткач', role: 'Level Designer', initials: 'МТ', isOwner: false }
    ]
  }
];

export default initialTeams;