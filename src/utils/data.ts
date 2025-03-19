import { Home, ContactPhoneOutlined, WhatsApp, AccountCircleOutlined, SnippetFolderOutlined, MonetizationOnOutlined, CreditCardOutlined, NetworkWifiOutlined, AssuredWorkloadOutlined, ShoppingBagOutlined, SendTimeExtensionOutlined, ArrowUpward, SendOutlined, ConnectWithoutContact, BarChart, SettingsCell, CameraRear, SportsSoccer, ConnectedTv, Wallet, HistoryEdu, Category } from '@mui/icons-material';

export const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        url: '/',
        icon: Home,
        dropdownMenu: [],
    },
    {
        id: 2,
        title: "Connect Bank",
        url: '/connect-bank',
        icon: AssuredWorkloadOutlined,
        dropdownMenu: [],
    },
    {
        id: 3,
        title: "Transfer",
        url: '',
        icon: SendTimeExtensionOutlined,
        dropdownMenu: [
            {
                id: 1,
                title: 'NGN - NGN Transfer',
                url: '/ngn-ngn-transfer'
            },
            {
                id: 2,
                title: 'NGN - Foreign Transfer',
                url: '/ngn-foreign-transfer'
            },
        ],
    },
    {
        id: 4,
        title: "Virtual Cards",
        url: '/virtual-cards',
        icon: AssuredWorkloadOutlined,
        dropdownMenu: [],
    },
    {
        id: 5,
        title: "Redeem Giftcard",
        url: '/redeem-giftcard',
        icon: AssuredWorkloadOutlined,
        dropdownMenu: [],
    },
    {
        id: 6,
        title: "VTU Payment",
        url: 'vtu-payment',
        icon: ShoppingBagOutlined,
        dropdownMenu: [
            {
                id: 1,
                title: 'Buy Airtime',
                url: '/buy-airtime'
            },
            {
                id: 2,
                title: 'Buy Data',
                url: '/buy-data'
            },
            {
                id: 3,
                title: 'Buy Bulk Data',
                url: '/buy-bulk-data'
            },
            {
                id: 4,
                title: 'Fetch Airtime Pin',
                url: '/fetch-airtime-pin'
            },
            {
                id: 5,
                title: 'Sell Airtime',
                url: '/sell-airtime'
            },
            {
                id: 6,
                title: 'Fund Wallet',
                url: '/fund-wallet'
            },
            {
                id: 7,
                title: 'Transaction History',
                url: '/transaction-history'
            },
        ],
    },
    {
        id: 7,
        title: "Data Menu",
        url: '',
        icon: NetworkWifiOutlined,
        dropdownMenu: [
            {
                id: 1,
                title: 'Data Pricing',
                url: '/data-pricing'
            },
            {
                id: 2,
                title: 'MTN Data Plans',
                url: '/mtn-data-plans'
            },
            {
                id: 3,
                title: 'Airtel Data Plans',
                url: '/airtel-data-plans'
            },
            {
                id: 4,
                title: 'Glo Data Plans',
                url: '/glo-data-plans'
            },
            {
                id: 5,
                title: '9Mobile Data Plans',
                url: '/9mobile-data-plans'
            },
        ],
    },
    {
        id: 8,
        title: "Bills Payment",
        url: '',
        icon: CreditCardOutlined,
        dropdownMenu: [
            {
                id: 1,
                title: 'DSTV',
                url: '/dstv'
            },
            {
                id: 2,
                title: 'GOTV',
                url: '/gotv'
            },
            {
                id: 3,
                title: 'STARTIMES',
                url: '/startimes'
            },
            {
                id: 4,
                title: 'WAEC PINS',
                url: '/waec-pins'
            },
            {
                id: 5,
                title: 'ELECTRICITY',
                url: '/electricity'
            },
            {
                id: 6,
                title: 'SPORTS AND BETTING',
                url: '/sports-and-betting'
            },
        ],
    },
    {
        id: 9,
        title: "Refer and Earn",
        url: '/refer-and-earn',
        icon: MonetizationOnOutlined,
        dropdownMenu: [],
    },
    {
        id: 10,
        title: "Account",
        url: '',
        icon: AccountCircleOutlined,
        dropdownMenu: [
            {
                id: 1,
                title: 'Profile',
                url: '/profile'
            },
            {
                id: 2,
                title: 'Profile Settings',
                url: '/profile-settings'
            },
            {
                id: 3,
                title: 'KYC Compliance',
                url: '/kyc-compliance'
            },
            {
                id: 4,
                title: 'Verification Status',
                url: '/verification-status'
            },
        ],
    },
    {
        id: 11,
        title: "API Docs",
        url: '/api-docs',
        icon: SnippetFolderOutlined,
        dropdownMenu: [],
    },
    {
        id: 12,
        title: "Join WhatsApp group",
        url: '/whatsapp',
        icon: WhatsApp,
        dropdownMenu: [],
    },
    {
        id: 13,
        title: "Contact Support",
        url: '/contact-support',
        icon: ContactPhoneOutlined,
        dropdownMenu: [],
    },
];

export const CardStatusDistribution = [
    {id: 1, cards: 950, name: 'Active' },
    {id: 2, cards: 300, name: 'Expired' },
    {id: 3, cards: 70, name: 'Inactive' },
    {id: 4, cards: 90, name: 'Blocked' },
    {id: 5, cards: 120, name: 'Lost' },
];
  
export const PIE_COLORS = ['#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];

export const recentCardRequestTableHead = [
    {id: 1, title: "Transaction"},
    {id: 2, title: "Amount"},
    {id: 3, title: "Status"},
    {id: 4, title: "Date"},
    {id: 5, title: "Category"},
];

export const cardRequests = [
    {id: 1, transaction: "Spotify", amount: '1,500', date: 'Wed 23:21pm', status: 'Success', category: 'Subscriptions', avatar: '2.jpeg' },
    {id: 2, transaction: "Alexa Doe", amount: '500', date: 'Wed 23:21pm', status: 'Declined', category: 'Deposit', avatar: 'default_avatar.png' },
    {id: 3, transaction: "Figma", amount: '1,500', date: 'Wed 23:21pm', status: 'Processing', category: 'Income', avatar: '3.jpeg' },
    {id: 4, transaction: "Fresh F&V", amount: '300', date: 'Wed 23:21pm', status: 'Success', category: 'Groceries', avatar: '5.jpeg' },
    {id: 5, transaction: "Sam Sulek", amount: '1,500', date: 'Wed 23:21pm', status: 'Processing', category: 'Food', avatar: 'default_avatar.png' },
    {id: 6, transaction: "Spotify", amount: '1,500', date: 'Wed 23:21pm', status: 'Success', category: 'Subscriptions', avatar: '2.jpeg' },
    {id: 7, transaction: "Alexa Doe", amount: '500', date: 'Wed 23:21pm', status: 'Declined', category: 'Deposit', avatar: 'default_avatar.png' },
    {id: 8, transaction: "Figma", amount: '1,500', date: 'Wed 23:21pm', status: 'Processing', category: 'Income', avatar: '3.jpeg' },
    {id: 9, transaction: "Fresh F&V", amount: '300', date: 'Wed 23:21pm', status: 'Success', category: 'Groceries', avatar: '5.jpeg' },
    {id: 10, transaction: "Sam Sulek", amount: '1,500', date: 'Wed 23:21pm', status: 'Processing', category: 'Food', avatar: 'default_avatar.png' },
];

export const budgets = [
    {id: 1, text1: "Subscriptions", text2: '$28 left', icon: 'setting-05.svg', bg: 'gray', overallColor: 'blue', progress: '25' },
    {id: 2, text1: "Food and booze", text2: '$120 left', icon: 'package-check.svg', bg: 'orange', overallColor: 'green', progress: '75' },
    {id: 3, text1: "Savings", text2: '$50 left', icon: 'credit-card-pos.svg', bg: 'green', overallColor: 'red', progress: '40' },
];

export const transactionsOptions = [
    {id: 1, title: "Local Transfer", btnText: 'Send', textIcon: ArrowUpward, btnIcon: SendOutlined},
    {id: 2, title: "Foreign Transfer", btnText: 'Send', textIcon: ArrowUpward, btnIcon: SendOutlined},
    {id: 3, title: "Connect Bank", btnText: 'Connect', textIcon: BarChart, btnIcon: ConnectWithoutContact},
];

export const availableTransactions = [
    {id: 1, title: "Airtime", icon: SettingsCell},
    {id: 2, title: "Data", icon: CameraRear},
    {id: 3, title: "Betting", icon: SportsSoccer},
    {id: 4, title: "TV Subscription", icon: ConnectedTv},
    {id: 5, title: "Fund Wallet", icon: Wallet},
    {id: 6, title: "Transaction History", icon: HistoryEdu},
    {id: 7, title: "More", icon: Category},
];

export const INITIAL_GENERAL_DATA = {
    currentTab: '/',
    // userName: 'Joseph Mark',
    // userEmail: 'joseph.mark@gmail.com',
}

export const availableBankOptions = [
    {id: 1, accountName: "Maleek Umar Buhari", bank: 'United Bank of Africa (UBA)', accountNumber: '9847635637'},
    {id: 2, accountName: "Onyeka Onwenu Veronica", bank: 'First Bank of Nigeria (FBN)', accountNumber: '8374649072'},
    {id: 3, accountName: "Vik John Basil", bank: 'Zenith Bank', accountNumber: '0947483622'},
    {id: 4, accountName: "John Doe Mark", bank: 'Fidelity Bank', accountNumber: '3384995787'},
    {id: 5, accountName: "Ifeanyi Hyacinth Okafor", bank: 'Union Bank', accountNumber: '0049044453'},
    {id: 6, accountName: "Mark Anthony Odumodu", bank: 'Access Bank', accountNumber: '2849111758'},
];