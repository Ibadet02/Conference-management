import { useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const useDownloadPDF = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadProjectId, setDownloadProjectId] = useState("");
  const [loading, setLoading] = useState("");

  const downloadLastPdf = async (correspondingUserId: string, projectId: string,  paperId: string) => {
    setDownloadProjectId(projectId);
    setLoading(paperId);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `user_papers/${correspondingUserId}/${projectId}`);
  
      const files = await listAll(storageRef);
      const lastFile = files.items[files.items.length - 1];
  
      if (lastFile) {
        const url = await getDownloadURL(lastFile);
        setDownloadUrl(url);
  
        // Open the file in a new tab
        window.open(url, '_blank');
        setLoading("")
      } else {
        setError('No files found in the specified path');
        setLoading("")
      }
    } catch (err: any) {
      setError(err.message);
      setLoading("")
    }
  };
  
  

  return { downloadLastPdf, downloadUrl, error,  downloadProjectId, downloadLoading: loading};
};

export default useDownloadPDF;


