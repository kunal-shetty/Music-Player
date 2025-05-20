document.addEventListener('DOMContentLoaded', function() {
    // App State
    const state = {
        songs: [],
        playlists: [],
        currentSongIndex: 0,
        isPlaying: false,
        currentPlaylist: 'all',
        volume: 80,
        isShuffle: false,
        isRepeat: false,
        currentSongId: null,
        currentModalSongId: null,
        modalMode: null // 'add-to-playlist' or 'create-playlist'
    };

    // DOM Elements
    const elements = {
        songItemContainer: document.getElementById('songItemContainer'),
        playlistList: document.getElementById('playlistList'),
        playlistModal: document.getElementById('playlistModal'),
        playlistOptions: document.getElementById('playlistOptions'),
        closeModal: document.getElementById('closeModal'),
        createPlaylistBtn: document.getElementById('createPlaylistBtn'),
        newPlaylistName: document.getElementById('newPlaylistName'),
        addToPlaylistBtn: document.getElementById('addToPlaylist'),
        masterPlay: document.getElementById('masterPlay'),
        myProgressBar: document.getElementById('myProgressBar'),
        gif: document.getElementById('gif'),
        currentSongTitle: document.getElementById('currentSongTitle'),
        currentSongArtist: document.getElementById('currentSongArtist'),
        currentSongImage: document.getElementById('currentSongImage'),
        previous: document.getElementById('previous'),
        next: document.getElementById('next'),
        shuffle: document.getElementById('shuffle'),
        repeat: document.getElementById('repeat'),
        volumeBar: document.getElementById('volumeBar'),
        searchInput: document.getElementById('searchInput'),
        currentPlaylistTitle: document.getElementById('currentPlaylistTitle'),
        modalTitle: document.querySelector('.modal-title')
    };

    // Audio Element
    const audioElement = new Audio();

    const songs = [
        {
            id: '1',
            title: 'Qaafirana',
            artist: 'Amit Trivedi, Arijit Singh',
            duration: '05:41',
            cover: 'Covers/Qaafirana Cover.jpg',
            file: 'Songs/Qaafirana-Amit-Trivedi,Arjit-Singh.mp3'
        },
        {
            id: '2',
            title: 'Jiya Lage Na',
            artist: 'Sona Mohapatra, Ravindra Upadhyay',
            duration: '04:36',
            cover: 'Covers/Jiya Lage Na Cover.jpg',
            file: 'Songs/Jiya Lage Na - Sona Mohapatra.mp3'
        },
        {
            id: '3',
            title: 'LOVE LOOKS PRETTY ON YOU',
            artist: 'Nessa Barret',
            duration: '03:12',
            cover: 'https://images.genius.com/8bcc77b2f23455ecce7a776229d91133.1000x1000x1.png',
            file: 'Songs/Nessa Barrett - LOVE LOOKS PRETTY ON YOU  (official lyric video).mp3'
        },
        {
            id: '4',
            title: 'Raabta',
            artist: 'Pritam, Arijit Singh',
            duration: '04:03',
            cover: 'https://c.saavncdn.com/603/Agent-Vinod-2012-500x500.jpg',
            file: 'Songs/Arijit Singh - Raabta (Lyrics Video) Agent Vinod  Saif Ali Khan , Kareena Kapoor Khan..mp3'
        },
        {
            id: '5',
            title: 'No. 1 Party Anthem',
            artist: 'Arctic Monkeys',
            duration: '04:03',
            cover: 'https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163',
            file: 'Songs/Arctic Monkeys - No. 1 Party Anthem (Lyrics).mp3'
        },
        {
            id: '6',
            title: 'Mannat',
            artist: 'Darshan Raval',
            duration: '02:39',
            cover: 'https://i.scdn.co/image/ab67616d0000b273c60cc14ac9fd0dc9a30d30f3',
            file: 'Songs/Darshan Raval - Mannat (lyrics).mp3'
        },
        {
            id: '7',
            title: 'Haan Ke Haan',
            artist: 'Sonali Sen, Monali Thakur, Kausar Munir',
            duration: '03:24',
            cover: 'https://c.saavncdn.com/461/Maharaj-Hindi-2024-20240622100909-500x500.jpg',
            file: 'Songs/Haan Ke Haan Lyrics - Maharaj  Monali Thakur.mp3'
        },
        {
            id: '8',
            title: 'Maula Mere Maula',
            artist: 'Roop Kumar Rathod',
            duration: '06:04',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/koMWQBbqLE/oMWQVq1bqL/size_l.webp',
            file: 'Songs/Maula Mere Maula  Lyrical  Anwar  Roop Kumar Rathod  Mithoon   Superhit Hindi Songs.mp3'
        },
        {
            id: '9',
            title: 'Noor E Khuda',
            artist: 'Shankar Loy, Shreya Goshal',
            duration: '06:37',
            cover: 'https://i.ytimg.com/vi/LSpjBsJGf5U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAJZLCGMZdzp7gQBXU1oV1k1awcmg',
            file: 'Songs/Noor E Khuda -lyrics  Adnan Sami, Shankar Mahadevan, Shreya Ghoshal  My Name Is Khan  @LYRICS.mp3'
        },
        {
            id: '10',
            title: 'Tera Deedar Hua',
            artist: 'Pritam, Anupam Amod',
            duration: '05:47',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/P7m3GvNKqx/7m3G9w5bqx/size_l.webp',
            file: 'Songs/Tera Deedar Hua - Lyrical Song  Emraan Hashmi, Esha  Jannat 2  Javed Ali  Rahat Fateh Ali Khan.mp3'
        },
        {
            id: '11',
            title: 'About You',
            artist: 'The 1975',
            duration: '05:26',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/9En3pqeWXD/n3pkJXZEKX/size_l.jpg',
            file: 'Songs/The 1975 - About You (Lyrics).mp3'
        },
        {
            id: '12',
            title: 'Waqt Ki Baatein',
            artist: 'Dream Note',
            duration: '04:03',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/10q3Z1K52r/0q3Zn7a135/size_l.webp',
            file: 'Songs/Waqt Ki Baatein - Dream Note ( Lyrics ).mp3'
        },
        {
            id: '13',
            title: 'Blue',
            artist: 'yung kai, MINNIE',
            duration: '03:33',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/BZgWoQOK2d/gWozllN232/size_l.jpg',
            file: 'Songs/yung kai, MINNIE - Blue (Lyrics).mp3'
        },
        {
            id: '14',
            title: 'Aaja Piya Tohe Pyar Doon',
            artist: 'Lata Mangeshkar',
            duration: '04:11',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/g4w3vr3jJB/4w3vBqA3jJ/size_l.webp',
            file: 'Songs/Aaja Piya Tohe Pyar Doon  Lata Mangeshkar  Lyrics video  Baharon ke sapne.mp3'
        },
        {
            id: '15',
            title: 'Ishq Hai',
            artist: 'Anurag Saikia, Raj Shekhar',
            duration: '05:12',
            cover: 'https://a10.gaanacdn.com/gn_img/albums/NOXWVgbkqL/XWVVwXmwWk/size_l.jpg',
            file: 'Songs/Ishq Hai Lyrics - Mismatched_ Season 3  Trending Hindi Song 2024.mp3'
        }
    ];


    function init() {
        loadData();
        renderSongs(songs);
        renderPlaylists();
        setupEventListeners();
      
        
        // Set initial volume
        audioElement.volume = state.volume / 100;
        elements.volumeBar.value = state.volume;
    }

    // Load data from localStorage
    function loadData() {
        // Load songs
        const savedSongs = localStorage.getItem('songs');
        state.songs = savedSongs ? JSON.parse(savedSongs) : songs;
        
        // Load playlists
        const savedPlaylists = localStorage.getItem('playlists');
        state.playlists = savedPlaylists ? JSON.parse(savedPlaylists) : [
            { id: 'all', name: 'All Songs', songs: state.songs.map(song => song.id) },
            { id: 'favorites', name: 'Favorites', songs: [] }
        ];
    }

    // Save data to localStorage
    function saveData() {
        localStorage.setItem('songs', JSON.stringify(state.songs));
        localStorage.setItem('playlists', JSON.stringify(state.playlists));
    }

    // Render songs to the UI
    function renderSongs(filteredSongs = null) {
        const songsToRender = filteredSongs || getCurrentPlaylistSongs();
        elements.songItemContainer.innerHTML = '';
        
        if (!songsToRender || songsToRender.length === 0) {
            elements.songItemContainer.innerHTML = '<div class="no-songs">No songs found</div>';
            return;
        }
        
        songsToRender.forEach((song) => {
            const songElement = document.createElement('div');
            songElement.className = 'songItem';
            songElement.innerHTML = `
                <button class="add-to-playlist" data-song-id="${song.id}">
                    <i class="fas fa-plus"></i>
                </button>
                <img src="${song.cover}" alt="${song.title}">
                <span class="songName">${song.title}</span>
                <span class="songArtist">${song.artist}</span>
                <div class="songlistplay">
                    <span class="timestamp">${song.duration}</span>
                    <i class="far fa-play-circle songItemPlay" data-song-id="${song.id}"></i>
                </div>
            `;
            elements.songItemContainer.appendChild(songElement);
        });
    }

    // Get songs for current playlist
    function getCurrentPlaylistSongs() {
        if (state.currentPlaylist === 'all') {
            return state.songs;
        }
        
        const playlist = state.playlists.find(p => p.id === state.currentPlaylist);
        if (!playlist) return [];
        
        return playlist.songs.map(songId => 
            state.songs.find(song => song.id === songId)
        ).filter(Boolean);
    }

    // Render playlists to the sidebar
    function renderPlaylists() {
        elements.playlistList.innerHTML = '';
        
        state.playlists.forEach(playlist => {
            if (playlist.id === 'all') return;
            
            const playlistElement = document.createElement('li');
            playlistElement.innerHTML = `
                <a href="#" data-playlist-id="${playlist.id}">${playlist.name}</a>
                <button class="delete-playlist" data-playlist-id="${playlist.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            elements.playlistList.appendChild(playlistElement);
        });
    }

    // Show add to playlist modal
    function showAddToPlaylistModal(songId) {
        state.currentModalSongId = songId;
        state.modalMode = 'add-to-playlist';
        elements.playlistModal.style.display = 'flex';
        elements.modalTitle.textContent = 'Add to Playlist';
        renderPlaylistOptions();
        elements.newPlaylistName.focus();
    }

    // Show create playlist modal
    function showCreatePlaylistModal() {
        state.currentModalSongId = null;
        state.modalMode = 'create-playlist';
        elements.playlistModal.style.display = 'flex';
        elements.modalTitle.textContent = 'Create Playlist';
        elements.playlistOptions.innerHTML = '';
        elements.newPlaylistName.value = '';
        elements.newPlaylistName.focus();
    }

    // Render playlist options in modal
    function renderPlaylistOptions() {
        elements.playlistOptions.innerHTML = '';
        
        state.playlists.forEach(playlist => {
            if (playlist.id === 'all') return;
            
            const isInPlaylist = playlist.songs.includes(state.currentModalSongId);
            const option = document.createElement('li');
            option.className = 'playlist-option';
            option.innerHTML = `
                ${playlist.name}
                ${isInPlaylist ? '<i class="fas fa-check playlist-option-check"></i>' : ''}
            `;
            
            option.addEventListener('click', () => {
                toggleSongInPlaylist(playlist.id, state.currentModalSongId);
            });
            
            elements.playlistOptions.appendChild(option);
        });
    }

    // Toggle song in playlist
    function toggleSongInPlaylist(playlistId, songId) {
        const playlist = state.playlists.find(p => p.id === playlistId);
        if (!playlist) return;
        
        const songIndex = playlist.songs.indexOf(songId);
        
        if (songIndex === -1) {
            playlist.songs.push(songId);
        } else {
            playlist.songs.splice(songIndex, 1);
        }
        
        saveData();
        renderPlaylistOptions();
        
        if (state.currentPlaylist === playlistId) {
            renderSongs();
        }
    }

    // Create new playlist or add song to new playlist
    function handlePlaylistAction() {
        const name = elements.newPlaylistName.value.trim();
        if (!name) return;

        const newPlaylist = {
            id: 'playlist-' + Date.now(),
            name: name,
            songs: state.modalMode === 'add-to-playlist' && state.currentModalSongId ? [state.currentModalSongId] : []
        };

        state.playlists.push(newPlaylist);
        saveData();
        renderPlaylists();
        hidePlaylistModal();

        if (state.modalMode === 'add-to-playlist') {
            selectPlaylist(newPlaylist.id);
        }
    }

    // Delete playlist
    function deletePlaylist(playlistId) {
        if (confirm('Are you sure you want to delete this playlist?')) {
            // Remove playlist from array
            state.playlists = state.playlists.filter(p => p.id !== playlistId);
            
            // If we were viewing this playlist, switch to all songs
            if (state.currentPlaylist === playlistId) {
                state.currentPlaylist = 'all';
                elements.currentPlaylistTitle.textContent = 'All Songs';
            }
            
            saveData();
            renderPlaylists();
            renderSongs();
        }
    }

    // Hide playlist modal
    function hidePlaylistModal() {
        elements.playlistModal.style.display = 'none';
    }

    // Select playlist
    function selectPlaylist(playlistId) {
        if (playlistId === 'home') {
            // Show all songs (home view)
            state.currentPlaylist = 'all';
            elements.currentPlaylistTitle.textContent = 'Recently Played';
            renderSongs();
            return;
        }
        
        state.currentPlaylist = playlistId;
        state.currentSongIndex = 0;
        
        const playlist = state.playlists.find(p => p.id === playlistId);
        elements.currentPlaylistTitle.textContent = playlist ? playlist.name : 'Recently Played';
        
        renderSongs();
        
        // Update UI to show selected playlist
        document.querySelectorAll('.playlist-list a').forEach(link => {
            link.style.color = link.getAttribute('data-playlist-id') === playlistId ? 
                'var(--primary)' : 'var(--light-gray)';
        });
    }

    // Play/pause toggle
    function togglePlay() {
        if (audioElement.paused) {
            if (!state.currentSongId && state.songs.length > 0) {
                playSong(state.songs[0]);
            } else if (state.currentSongId) {
                audioElement.play();
            }
        } else {
            audioElement.pause();
        }
        
        updatePlayButton();
    }

    // Update play button state
    function updatePlayButton() {
        if (audioElement.paused) {
            elements.masterPlay.classList.remove('fa-pause-circle');
            elements.masterPlay.classList.add('fa-play-circle');
            elements.masterPlay.classList.remove('playing');
            elements.gif.style.opacity = 0;
        } else {
            elements.masterPlay.classList.remove('fa-play-circle');
            elements.masterPlay.classList.add('fa-pause-circle');
            elements.masterPlay.classList.add('playing');
            elements.gif.style.opacity = 1;
        }
    }

    // Play song by ID
    function playSongById(songId) {
        const song = state.songs.find(s => s.id === songId);
        if (song) {
            state.currentSongId = songId;
            playSong(song);
        }
    }

    // Play song
    function playSong(song) {
        audioElement.src = song.file;
        audioElement.play();
        
        // Update UI
        elements.currentSongTitle.textContent = song.title;
        elements.currentSongArtist.textContent = song.artist;
        elements.currentSongImage.src = song.cover;
        
        // Update state
        state.isPlaying = true;
        state.currentSongId = song.id;
        
        // Find current song index
        const currentSongs = getCurrentPlaylistSongs();
        state.currentSongIndex = currentSongs.findIndex(s => s.id === song.id);
        
        updatePlayButton();
    }

    // Play previous song
    function playPreviousSong() {
        const currentSongs = getCurrentPlaylistSongs();
        if (currentSongs.length === 0) return;
        
        state.currentSongIndex = (state.currentSongIndex - 1 + currentSongs.length) % currentSongs.length;
        playSong(currentSongs[state.currentSongIndex]);
    }

    // Play next song
    function playNextSong() {
        const currentSongs = getCurrentPlaylistSongs();
        if (currentSongs.length === 0) return;
        
        if (state.isShuffle) {
            state.currentSongIndex = Math.floor(Math.random() * currentSongs.length);
        } else {
            state.currentSongIndex = (state.currentSongIndex + 1) % currentSongs.length;
        }
        
        playSong(currentSongs[state.currentSongIndex]);
    }

    // Handle song ended
    function handleSongEnded() {
        if (state.isRepeat) {
            audioElement.currentTime = 0;
            audioElement.play();
        } else {
            playNextSong();
        }
    }

    // Seek song
    function seekSong() {
        const seekTime = (elements.myProgressBar.value * audioElement.duration) / 100;
        audioElement.currentTime = seekTime;
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        elements.myProgressBar.value = progress;
        elements.myProgressBar.style.setProperty('--progress', progress + '%');
    }

    // Adjust volume
    function adjustVolume() {
        state.volume = elements.volumeBar.value;
        audioElement.volume = state.volume / 100;
    }

    // Toggle shuffle
    function toggleShuffle() {
        state.isShuffle = !state.isShuffle;
        elements.shuffle.style.color = state.isShuffle ? 'var(--primary)' : 'var(--light)';
    }

    // Toggle repeat
    function toggleRepeat() {
        state.isRepeat = !state.isRepeat;
        elements.repeat.style.color = state.isRepeat ? 'var(--primary)' : 'var(--light)';
    }

    // Handle search
    function handleSearch() {
        const query = elements.searchInput.value.toLowerCase();
        if (!query) {
            renderSongs();
            return;
        }
        
        const filteredSongs = state.songs.filter(song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
        
        renderSongs(filteredSongs);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Play/pause button
        elements.masterPlay.addEventListener('click', togglePlay);
        
        // Previous song button
        elements.previous.addEventListener('click', playPreviousSong);
        
        // Next song button
        elements.next.addEventListener('click', playNextSong);
        
        // Progress bar
        elements.myProgressBar.addEventListener('input', seekSong);
        
        // Volume control
        elements.volumeBar.addEventListener('input', adjustVolume);
        
        // Shuffle button
        elements.shuffle.addEventListener('click', toggleShuffle);
        
        // Repeat button
        elements.repeat.addEventListener('click', toggleRepeat);
        
        // Song ended
        audioElement.addEventListener('ended', handleSongEnded);
        
        // Time update
        audioElement.addEventListener('timeupdate', updateProgressBar);
        
        // Create playlist button
        elements.createPlaylistBtn.addEventListener('click', showCreatePlaylistModal);
        
        // Add to playlist button
        elements.addToPlaylistBtn.addEventListener('click', handlePlaylistAction);
        
        // Close modal button
        elements.closeModal.addEventListener('click', hidePlaylistModal);
        
        // Click outside modal to close
        elements.playlistModal.addEventListener('click', function(e) {
            if (e.target === elements.playlistModal) {
                hidePlaylistModal();
            }
        });
        
        // Search input
        elements.searchInput.addEventListener('input', handleSearch);
        
        // Delegate song play clicks
        document.addEventListener('click', function(e) {
            // Play song
            if (e.target.classList.contains('songItemPlay')) {
                const songId = e.target.getAttribute('data-song-id');
                playSongById(songId);
            }
            
            // Add song to playlist
            if (e.target.closest('.add-to-playlist')) {
                const songId = e.target.closest('.add-to-playlist').getAttribute('data-song-id');
                showAddToPlaylistModal(songId);
            }
            
            // Select playlist from sidebar
            if (e.target.closest('[data-playlist-id]')) {
                e.preventDefault();
                const playlistId = e.target.closest('[data-playlist-id]').getAttribute('data-playlist-id');
                selectPlaylist(playlistId);
            }
            
            // Delete playlist
            if (e.target.closest('.delete-playlist')) {
                e.preventDefault();
                e.stopPropagation();
                const playlistId = e.target.closest('.delete-playlist').getAttribute('data-playlist-id');
                deletePlaylist(playlistId);
            }
        });
    }

    // Initialize the app
    init();
});
  