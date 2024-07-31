const sharp = require('sharp');
const { ExifTool } = require('exiftool-vendored');
const exiftool = new ExifTool();
const path = require('path');
const fs = require('fs');

// Caminho da imagem original
const inputPath = path.join(__dirname, '../src/assets/img/');

// Pasta de saída
const outputDir = path.join(__dirname, '../src/assets/images/');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [
    { name: 'sm', width: 640, height: 426 },
    { name: 'md', width: 768, height: 512 },
    { name: 'lg', width: 1024, height: 683 },
    { name: 'xl', width: 1280, height: 853 },
    { name: '2xl', width: 1536, height: 1024 }
];

// Caminho do arquivo JSON com os metadados
const metadataFile = path.join(__dirname, './image-metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));

// Metadados a serem atualizados
const metadataToRemove = {
    Title: '',
    Author: '',
    Description: '',
    Keywords: '',
    Location: '',
    CreateDate: '',
    ModifyDate: '',
    GPSLatitude: '',
    GPSLongitude: '',
    GPSPosition: ''
};
// Função para converter imagem para WebP
async function imageConvertToWebp(filePath, size) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(outputDir, `${fileName}-${size.name}.webp`);
    try {
      await sharp(filePath)
        .resize(size.width, size.height, {
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Imagem convertida: ${outputPath}`);
    } catch (error) {
      console.error(`Erro ao converter imagem para ${size.name}:`, error);
    }
}

async function updateMetadata(filePath, fileName) {
    const fileMetadata = metadata[fileName];
    if (fileMetadata) {
      try {
        await exiftool.write(filePath, fileMetadata);
        console.log(`Metadados atualizados para: ${filePath}`);
      } catch (error) {
        console.error(`Erro ao atualizar metadados para ${filePath}:`, error);
      }
    }
  }

// Função para processar todas as imagens no diretório
async function createImages() {

    
    fs.readdir(inputDir, (err, files) => {
      if (err) {
        console.error('Erro ao ler o diretório de imagens', err);
        return;
      }
  
      files.forEach(file => {
        const filePath = path.join(inputDir, file);
        // Verifica se é uma imagem
        if (/\.(jpg|jpeg|png)$/i.test(file)) {
            updateMetadata(filePath).then(() => {
                sizes.forEach(size => imageConvertToWebp(filePath, size));
            });
        }
      });
    });
  }
  


  createImages();

  process.on('exit', () => {
    exiftool.end();
  });