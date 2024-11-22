const images = Array.from(document.querySelectorAll('img'));
const infoContainers = Array.from(document.querySelectorAll('.image-info'));

function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          console.dir(blob);
          const format = url.split('.').pop();
          const dimensions = {
            width: img.width,
            height: img.height,
          };
          const alt = img.alt;
          const size = blob.size;

          resolve({ format, dimensions, alt, size });
        })
        .catch(reject);
    };

    img.onerror = reject;
  });
}

function displayImageInfo(url, container, alt) {
  console.log(url);
  getImageInfo(url)
    .then((info) => {
      const formatElement = document.createElement('p');
      formatElement.innerHTML = `<b>Format:</b> ${info.format}`;
      container.appendChild(formatElement);

      const dimensionsElement = document.createElement('p');
      dimensionsElement.innerHTML = `<b>Dimensions:</b> ${info.dimensions.width}x${info.dimensions.height}`;
      container.appendChild(dimensionsElement);

      const altElement = document.createElement('p');
      altElement.innerHTML = `<b>Alt:</b> ${alt}`;
      container.appendChild(altElement);

      const sizeElement = document.createElement('p');
      sizeElement.innerHTML = `<b>Size:</b> ${info.size} bytes`;
      container.appendChild(sizeElement);
    })
    .catch(console.error);
}

const container = document.querySelector('#image-info-container');

images.forEach((img, i) => {
  displayImageInfo(img.src, infoContainers[i], img.getAttribute('alt'));
});

document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('menu').classList.toggle('hidden');
});
