import { MenuItem } from './menu-item.model';

export const MenuConfig: MenuItem[] = [
    {
     rows: [
                {
                    id: 1,
                    name: 'Barcode',
                    icon: 'md-barcode',
                    routerLink: 'barcode'
                },
                {
                    id: 2,
                    name: 'Alarm',
                    icon: 'md-alarm',
                    routerLink: 'tab2'
                },
                {
                    id: 3,
                    name: 'Timer',
                    icon: 'md-timer',
                    routerLink: 'tab2'
                },
                {
                    id: 4,
                    name: 'Download',
                    icon: 'md-download',
                    routerLink: 'tab2'
                }
           ]
    },
    {
     rows: [
                {
                    id: 5,
                    name: 'Games',
                    icon: 'md-american-football',
                    routerLink: 'tab2'
                },
                {
                    id: 6,
                    name: 'Analyzer',
                    icon: 'md-analytics',
                    routerLink: 'tab2'
                },
                {
                    id: 7,
                    name: 'Battery',
                    icon: 'md-battery-charging',
                    routerLink: 'tab2'
                },
                {
                    id: 8,
                    name: 'Coffee',
                    icon: 'md-beer',
                    routerLink: 'tab2'
                }
           ]
    },
    {
     rows: [
                {
                    id: 9,
                    name: 'Bicycle',
                    icon: 'md-bicycle',
                    routerLink: 'tab2'
                },
                {
                    id: 10,
                    name: 'Bluetooth',
                    icon: 'md-bluetooth',
                    routerLink: 'tab2'
                },
                {
                    id: 11,
                    name: 'Bug',
                    icon: 'md-bug',
                    routerLink: 'tab2'
                },
                {
                    id: 12,
                    name: 'Calendar',
                    icon: 'md-calendar',
                    routerLink: 'tab2'
                }
           ]
    }
];
