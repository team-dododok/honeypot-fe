import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export const saveImageFromRef = async (
    ref: React.RefObject<HTMLElement>,
    fileName: string,
    width: string | null,
    padding: string | null,
    borderRadius: string | null,
) => {
  if (!ref.current) return;

  try {
    const div = ref.current;

    /* 가상의 컨테이너 생성 */
    const virtualContainer = document.createElement('div');
    virtualContainer.style.position = 'absolute';
    virtualContainer.style.top = '-9999px';
    virtualContainer.style.left = '-9999px';
    virtualContainer.style.padding = padding || '0px';
    virtualContainer.style.borderRadius = borderRadius || '0px';
    virtualContainer.style.backgroundColor = '#FBFAF9';
    virtualContainer.style.width = width || `${div.offsetWidth + 40}px`;
      virtualContainer.style.height = `${div.offsetHeight + 40}px`;
    virtualContainer.style.overflow = 'hidden';

    /* 실제 내용을 복사하여 가상 컨테이너에 추가 */
    const clonedDiv = div.cloneNode(true) as HTMLDivElement;
    clonedDiv.style.margin = '0';
    virtualContainer.appendChild(clonedDiv);

    document.body.appendChild(virtualContainer);

    /* html2canvas로 가상 컨테이너 캡처 */
    const canvas = await html2canvas(virtualContainer, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: 'transparent',
    });

    /* 이미지 저장 */
    canvas.toBlob((blob) => {
      if (blob !== null) {
        saveAs(blob, fileName);
      }
    });

    document.body.removeChild(virtualContainer);
  } catch (error) {
    console.error('이미지 변환 오류 발생:', error);
  }
};
