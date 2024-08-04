# Portalo

All-in-one solution to organize your life through private data storage 🪄📁

Portalo leverages blockchain technology to ensure you own your data while allowing you to safely share the data with anyone you want.

## Content

This repository contains the UI of Portalo.

- Profiles management
- Blockchain interaction
- ZK Circuit's proof generation
- Data sharing
- PWA

## Running locally

1. Clone this project

```bash
git clone https://github.com/portalo-app/portalo-ui.git
```

2. Change into the directory and install the dependencies

```bash
cd portalo-ui
pnpm install
```

3. Create a file named **.env** and update it with the values, you can see the template in **.env.template**

```
# GOOGLE ANALYTICS
NEXT_PUBLIC_GOOGLE_ANALYTICS=<GA-MEASUREMENT-ID>

# PORTALO SMART CONTRACT
NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS=<PORTALO_CONTRACT_ADDRESS>
```

4. Run the server

```bash
pnpm dev
```

## Contact

For any inquiries, please contact us at [contact@neopower.digital](mailto:contact@neopower.digital).
