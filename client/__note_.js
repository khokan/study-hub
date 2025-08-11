import ImageKit from "imagekit";
-------------------
 const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
    privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  });
----------------
  const uploadResponse = await imagekit.upload({
        file: file,
        fileName: `${Date.now()}_${file.name}`,
        folder: "/materials",
        tags: ["material", user.email],
      });
------------
image: uploadResponse.url,