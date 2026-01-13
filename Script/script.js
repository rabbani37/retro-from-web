const postQueryDataLoad = async (searchInputValue) => {
    loadingANDspinner(true)
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInputValue || " "}`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    postsDisplayFunc(posts);
};

const latestPostDataLoad = async () => {
    loadingANDspinner(true);
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
    const res = await fetch(url);
    const data = await res.json();
    latestPostDisplay(data);
}


const postsDisplayFunc = (posts) => {
    const postsContainer = document.getElementById("posts_container");
    postsContainer.textContent = '';
    
    posts.forEach(post => {
        // console.log(post);
        const postCard = document.createElement("div");
        postCard.innerHTML = `
                <div class="flex flex-row gap-x-6 bg-slate-200 card card-body card-border rounded-2xl mb-5">
                    <div class="avatar avatar-online w-12 h-12">
                        <div class=" rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                        </div>
                    </div>


                    <div>
                        <div class="text-gray-600 flex items-center font-medium">
                            <p>#${post.category}</p>
                            <p>Author: ${post.author.name}</p>
                        </div>
                        <h2 id="title" class="card-title">${post.title}</h2>
                        <p class="text-gray-600 my-5">It’s one thing to subject yourself to ha Halloween costume
                            mishap because, hey that’s your prerogative
                        </p>
                        <div class="border-b-2 border-dashed text-gray-400"></div>
                        <div class=" flex justify-between items-center mt-5">
                            <div class="flex justify-between items-center gap-10 ">
                                <div class="flex justify-between items-center gap-3 text-gray-500">
                                    <i class="fa-regular text-xl fa-message"></i>
                                    <p class="text-xl">560</p>
                                </div>
                                <div class="flex justify-between items-center gap-3 text-gray-500">
                                    <i class="fa-regular text-xl fa-eye"></i>
                                    <p class="text-xl">1,568</p>
                                </div>
                                <div class="flex justify-between items-center gap-3 text-gray-500">
                                    <i class="fa-regular text-xl fa-clock"></i>
                                    <p class="text-xl">560</p>
                                </div>
                            </div>
                            <div>
                                <button onclick="handlerRead(this)" class="btn bg-green-400 text-white rounded-full"><i
                                        class="fa-solid fa-inbox"></i>
                                        Read
                                        </button>
                            </div>
                        </div>
                    </div>
                </div>
    
    `;
        postsContainer.appendChild(postCard)

    });
    loadingANDspinner(false);
};

// Latest Posts
const latestPostDisplay = (postS) => {
    const latestContainer = document.getElementById("latest_Container");

    postS.forEach(post => {
        // console.log(post);
        const newPost = document.createElement("div");
        newPost.classList = "card bg-base-100 shadow-sm"
        newPost.innerHTML = `
                <figure class="p-5">
                        <img src="${post.cover_image}"
                            alt="Cover Picture" class="rounded-xl" />
                    </figure>
                    <div class="card-body ">
                        <p class="text-gray-500">
                            <i class="fa-regular fa-calendar"></i> 
                            <span>${post.author.posted_date || "No date publish"}</span>
                        </p>
                        <h2 class="card-title">${post.title}</h2>
                        <p>
                        ${post.description}
                        </p>
                        <div class="card-actions">
                            <div class="avatar ">
                                <div class="w-10 rounded-full">
                                    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                                </div>
                            </div>
                            <div>
                                <p class="font-bold">${post.author.name}</p>
                                <p class="text-gray-500">${post.author?.designation || "Unknown"} </p>
                            </div>
                        </div>
                    </div> 
        
        `;
        latestContainer.appendChild(newPost);
    });
    loadingANDspinner(false)
}
// handler Message Read
let readdCount = 0
const handlerRead = (currentButton) => {
    readdCount++;
    const readdPost = document.getElementById("readd_post");
    const readNumber = document.getElementById("readd_number");
    const cardTitle = currentButton.parentNode.parentNode.parentNode.querySelector("#title").innerText
    const readd = document.createElement("div");
    readd.classList = 'flex justify-between  bg-white p-5 rounded-xl gap-10 mb-5 '
    readd.innerHTML = `
                    <div>
                        <p>${cardTitle}</p>
                    </div>
                    <div class="flex items-center gap-x-2 text-gray-500">
                        <i class="fa-regular text-xl fa-eye"></i>
                        <p>1560</p>
                    </div>
    `;
    readNumber.innerText = readdCount;

    readdPost.appendChild(readd)
    console.log()
}

// Search Button Handle
const searchHandle = (SearchKeyWord) => {
    const searchInput = document.getElementById("search_input");
    const searchInputValue = searchInput.value;
    postQueryDataLoad(searchInputValue)
    console.log(searchInputValue)
}


// loading_spinner
const loadingANDspinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading_spinner");
    const loadingSpinner2 = document.getElementById("loading_spinner2");
    // console.log(isLoading)
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
        loadingSpinner2.classList.remove("hidden")
    } else {
        loadingSpinner.classList.add("hidden")
        loadingSpinner2.classList.add("hidden")
    }

}

postQueryDataLoad();
latestPostDataLoad()