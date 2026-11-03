import { defineStore } from 'pinia'

export const useLinksStore = defineStore('links', {
  state: () => ({
    data: {
      primary: [
        {
          label: 'Twitch', description: 'Потрясающие трансляции лайк подписка',
          size: 3,
          href: 'https://www.twitch.tv/gufovicky', platform: 'twitch'
        },
        {
          label: 'Telegram', description: 'Наверное, самый эксклюзивный контент',
          size: 3,
          href: 'https://t.me/GGufen', platform: 'telegram'
        },
      ],
      support: [
        {
          label: 'Boosty', description: 'Неконтент общемирового значения',
          size: 6,
          href: 'https://boosty.to/gufen', platform: 'boosty'
        },
        {
          label: 'Donation alerts', description: 'Поддержать любимого стримера',
          size: 3,
          href: 'https://www.donationalerts.com/r/gufovicky', platform: 'donationalerts'
        },
        {
          label: 'Meme alerts',
          size: 3,
          href: 'https://memealerts.com/Gufen', platform: 'memealerts'
        }
      ],
      youtube: [
        {
          label: 'Гуфовский', description: 'Жил был я и был у меня канал на ютубе...',
          size: 3,
          href: 'https://www.youtube.com/channel/UCRT9pHOR2iY4qw0qxt7dQpw', platform: 'youtube'
        },
        {
          label: 'гуфовики', description: 'Это не видео',
          size: 3,
          href: 'https://www.youtube.com/channel/UCAmDOiECS2c0J-YHluR1ZTg', platform: 'youtube'
        },
        {
          label: 'Гуфовске Лайф',
          size: 3,
          href: 'https://www.youtube.com/@Gufovicky', platform: 'youtube'
        },
        {
          label: 'Гуфошортики', description: 'Короткие смешные приколдесы приколябры прикольчики преколы прикокульки',
          size: 3,
          href: 'https://www.youtube.com/@Gufoshortiki', platform: 'youtube'
        }
      ]
    }
  })
})