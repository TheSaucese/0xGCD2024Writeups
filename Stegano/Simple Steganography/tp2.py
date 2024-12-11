import cv2
import numpy as np
import matplotlib.pyplot as plt

def embed_lsb(cover_img, secret_img, k_bits):
    # Make sure images are same size
    stego = cover_img.copy()
    
    # Clear the k LSBs of cover image
    stego = stego & (256 - 2**k_bits)
    
    # Scale down secret image to k bits
    secret = secret_img >> (8 - k_bits)
    
    # Embed secret in LSBs
    stego = stego | secret
    
    return stego

def calculate_metrics(original, stego):
    mse = np.mean((original - stego) ** 2)
    if mse == 0:
        psnr = 100
    else:
        psnr = 10 * np.log10((255.0 ** 2) / mse)
    return mse, psnr

# Load images
cover = cv2.imread('animalfarm.png', cv2.IMREAD_GRAYSCALE)
secret = cv2.imread('truth1.png', cv2.IMREAD_GRAYSCALE)

# Resize secret to match cover if needed
secret = cv2.resize(secret, (cover.shape[1], cover.shape[0]))

# Test different k values
k_values = [1, 2, 3, 4, 5]
psnr_values = []
mse_values = []

for k in k_values:
    # Embed secret image
    stego_img = embed_lsb(cover, secret, k)
    
    # Calculate metrics
    mse, psnr = calculate_metrics(cover, stego_img)
    psnr_values.append(psnr)
    mse_values.append(mse)
    
    print(f"k={k}:")
    print(f"MSE: {mse:.2f}")
    print(f"PSNR: {psnr:.2f} dB\n")
    
    # Save stego image
    cv2.imwrite(f'stego_k{k}.png', stego_img)

# Plot PSNR vs k
plt.figure(figsize=(10, 6))
plt.plot(k_values, psnr_values, 'b-o')
plt.xlabel('k (number of LSB bits used)')
plt.ylabel('PSNR (dB)')
plt.title('PSNR vs Number of LSB bits')
plt.grid(True)
plt.show()

# Optional: Display original, stego, and difference images for k=1
if k_values[0] == 1:
    plt.figure(figsize=(15, 5))
    
    plt.subplot(131)
    plt.imshow(cover, cmap='gray')
    plt.title('Original Cover Image')
    
    stego_k1 = embed_lsb(cover, secret, 1)
    plt.subplot(132)
    plt.imshow(stego_k1, cmap='gray')
    plt.title('Stego Image (k=1)')
    
    diff = np.abs(cover - stego_k1)
    plt.subplot(133)
    plt.imshow(diff, cmap='gray')
    plt.title('Difference Image')
    
    plt.show()