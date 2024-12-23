import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Desabilita o bodyParser padrão para processar arquivos
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Diretório onde os arquivos serão salvos
      const resultsDir = path.join(process.cwd(), 'results');
      if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir);
      }

      const fileName = req.headers['file-name'] || 'default.csv';
      const filePath = path.join(resultsDir, fileName);

      // Salvar o arquivo recebido no servidor
      const fileStream = fs.createWriteStream(filePath);
      req.pipe(fileStream);

      fileStream.on('finish', () => {
        res.status(200).json({ message: 'Arquivo salvo com sucesso', filePath });
      });

      fileStream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar o arquivo' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro no servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
