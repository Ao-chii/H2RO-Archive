import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "Wings of Courage (ピアノアレンジ1)",
		artist: "Elements Garden",
		cover: "assets/music/cover/cover-elements-garden.jpg",
		url: "assets/music/url/track-001.mp3",
		duration: 0,
	},
	{
		id: 2,
		title: "World Goes Round",
		artist: "岩崎太整&二宮愛",
		cover: "assets/music/cover/cover-iwasaki-ninomiya.jpg",
		url: "assets/music/url/track-002.mp3",
		duration: 0,
	},
	{
		id: 3,
		title: "この櫻ノ詩の下",
		artist: "松本文紀",
		cover: "assets/music/cover/cover-matsumoto-fuminori.jpg",
		url: "assets/music/url/track-003.mp3",
		duration: 0,
	},
	{
		id: 4,
		title: "夢の歩みを見上げて",
		artist: "松本文紀",
		cover: "assets/music/cover/cover-matsumoto-fuminori.jpg",
		url: "assets/music/url/track-004.mp3",
		duration: 0,
	},
	{
		id: 5,
		title: "月の眼球譚",
		artist: "松本文紀",
		cover: "assets/music/cover/cover-matsumoto-fuminori.jpg",
		url: "assets/music/url/track-005.mp3",
		duration: 0,
	},
	{
		id: 6,
		title: "美しい音色で世界が鳴った",
		artist: "松本文紀",
		cover: "assets/music/cover/cover-matsumoto-fuminori.jpg",
		url: "assets/music/url/track-006.mp3",
		duration: 0,
	},
	{
		id: 7,
		title: "花弁となり 世界は大いに歌う",
		artist: "松本文紀",
		cover: "assets/music/cover/cover-matsumoto-fuminori.jpg",
		url: "assets/music/url/track-007.mp3",
		duration: 0,
	},
	{
		id: 8,
		title: "見上げた青の果て",
		artist: "松本文紀",
		cover: "assets/music/cover/cover-matsumoto-fuminori.jpg",
		url: "assets/music/url/track-008.mp3",
		duration: 0,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: "/favicon/favicon.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
