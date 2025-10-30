export const useGalleriaMaskClick = (visible) => {
  const onMaskClick = () => {
    visible.value = false
  }
  
  const onGalleriaClick = (e) => {
    e.stopPropagation();
  }
  
  const listenMaskElementClick = () => {
    document.querySelector('.p-galleria-mask')?.addEventListener('click', onMaskClick);
    document.querySelector('.p-galleria')?.addEventListener('click', onGalleriaClick);   // for stop triggering mask click
  }
  
  const removeMaskElementClick = () => {
    document.querySelector('.p-galleria-mask')?.removeEventListener('click', onMaskClick);
    document.querySelector('.p-galleria')?.removeEventListener('click', onGalleriaClick);
  }

  return {
    listenMaskElementClick,
    removeMaskElementClick
  }
}