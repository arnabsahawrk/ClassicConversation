//Let's Discuss
const allPostLoadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  discussFunctionality(data.posts);
};

function discussFunctionality(posts) {
  const postSection = document.getElementById("posts");

  //Lopping on post
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className =
      "flex flex-col md:flex-row gap-6 p-10 bg-[#797DFC1A] rounded-3xl";
    div.innerHTML = `
    <!-- Author -->
          <div class="relative">
            <img
              class="size-[72px] rounded-2xl"
              src="${post?.image || "Not Available"}"
              alt=""
            />
            <span
              class="absolute top-0 left-14 transform -translate-y-1/4 size-[18.667px] ${
                post?.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"
              } rounded-full"
            ></span>
          </div>
          <!-- Post  -->
          <div class="space-y-4 flex-1">
            <ul
              class="flex gap-6 items-center text-sm text-[#12132DCC] font-medium"
            >
              <li># <span>${post?.category || "Not Available"}</span></li>
              <li>Author: <span>${
                post?.author?.name || "Not Available"
              }</span></li>
            </ul>
            <article class="border-b-2 border-dashed border-[#12132D40]">
              <h2 class="text-xl text-[#12132D] font-bold mb-4">
              ${post?.title || "Not Available"}
              </h2>
              <p class="text-base text-[#12132D99] font-medium mb-5">
              ${post?.description || "Not Available"}
              </p>
            </article>
            <div class="flex items-center justify-between">
              <ul class="flex gap-6 items-center text-base text-[#12132D99]">
                <li class="flex gap-2 md:gap-3 items-center">
                  <i class="fa-solid fa-message"></i><span>${
                    post?.comment_count || "Not Available"
                  }</span>
                </li>
                <li class="flex gap-2 md:gap-3 items-center">
                  <i class="fa-regular fa-eye"></i><span>${
                    post?.view_count || "Not Available"
                  }</span>
                </li>
                <li class="flex gap-2 md:gap-3 items-center">
                  <i class="fa-regular fa-clock"></i><span>${
                    post?.posted_time || "Not Available"
                  } min</span>
                </li>
              </ul>
              <button
                onclick="marked('${post?.title || "Not Available"}', '${
      post?.view_count || "Not Available"
    }')"
                type="button"
                class="bg-[#10B981] text-white px-2 py-1 rounded-full"
              >
                <i class="fa-regular fa-envelope-open"></i>
              </button>
            </div>
          </div>
    `;
    postSection.appendChild(div);
  });
}

// Post Making
function closure() {
  let count = 1;
  function remember() {
    return count++;
  }
  return remember;
}
const check = document.getElementById("markChecked");
const markCount = document.getElementById("markedCount");
const count = closure();

//Post Selected
const selected = document.getElementById("markedPost");
//Clicked
const marked = (title, view) => {
  check.classList.add("text-[#3DCE09]");
  markCount.innerText = count();

  const article = document.createElement("article");
  article.className =
    "flex items-center justify-between bg-white p-4 rounded-2xl";
  article.innerHTML = `
    <h2 class="text-[#12132D] text-base font-semibold">
                ${title}
              </h2>
              <p class="flex gap-3 items-center text-base text-[#12132D99]">
                <i class="fa-regular fa-eye"></i><span>${view}</span>
              </p>
    `;
  selected.appendChild(article);
};

allPostLoadData();
