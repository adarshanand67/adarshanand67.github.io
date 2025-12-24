/**
 * @fileoverview Music player constants - playlist tracks, names, and album art.
 */
import { basePath } from "./base";

/**
 * Music playlist - array of MP3 file paths for the music player.
 * All paths are prefixed with basePath for deployment flexibility.
 * @constant
 */
export const playlist = [
    `${basePath}/assets/music/theWorld.mp3`,
    `${basePath}/assets/music/cruelAngelsThesis.mp3`,
    `${basePath}/assets/music/onePunchMan.mp3`,
    `${basePath}/assets/music/pokemonTheme.mp3`,
    `${basePath}/assets/music/tank.mp3`,
    `${basePath}/assets/music/unravel.mp3`,
    `${basePath}/assets/music/blueBird.mp3`,
    `${basePath}/assets/music/go.mp3`,
    `${basePath}/assets/music/gurenNoYumiya.mp3`
] as const;

/**
 * Track display names corresponding to playlist array.
 * @constant
 */
export const trackNames = [
    "The World (Death Note)",
    "A Cruel Angel's Thesis (Evangelion)",
    "THE HERO!! (One Punch Man)",
    "Pokemon Theme (Instrumental)",
    "Tank! (Cowboy Bebop)",
    "Unravel (Tokyo Ghoul)",
    "Blue Bird (Naruto)",
    "GO!!! (Naruto)",
    "Guren no Yumiya (Attack on Titan)",
] as const;

/**
 * Album art image URLs from MyAnimeList CDN.
 * @constant
 */
export const trackImages = [
    "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
    "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg",
    "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
    "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
    "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
    "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",
    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
] as const;
