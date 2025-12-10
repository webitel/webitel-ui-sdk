// primevue's galleria doesn't support hiding on mask click so there is a custom solution
export const useGalleriaMaskClick = (visible) => {
  const onMaskClick = ({target}) => { 
    if (target.classList.contains('p-galleria-mask')) {
      visible.value = false
    }
  }

  const listenMaskElementClick = () => {
    document.querySelector('.p-galleria-mask')?.addEventListener('click', onMaskClick);
  }
  
  const removeMaskElementClick = () => {
    document.querySelector('.p-galleria-mask')?.removeEventListener('click', onMaskClick);
  }

  return {
    listenMaskElementClick,
    removeMaskElementClick
  }
}