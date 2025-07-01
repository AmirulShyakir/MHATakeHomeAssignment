# Base image with Node.js
FROM node:18-alpine AS base

# Install pnpm globally in the base image so it is available in all stages
# RUN npm install -g pnpm
RUN npm install -g pnpm@8

# Install dependencies
FROM base AS deps

# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Build the app
FROM base AS builder

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Ensure permissions are set correctly for node_modules
RUN chmod -R 777 /app/node_modules

# Copy the rest of the app files
COPY . .

# Run the build script using pnpm
RUN pnpm run build

# Final stage to run the app
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

# Create nodejs group and nextjs user for running the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public files from builder stage
COPY --from=builder /app/public ./public

# Ensure the .next directory is created and permissions are set correctly
RUN mkdir .next
RUN chown nextjs:nodejs .next
ENV TZ=Asia/Singapore
RUN ln -snf /usr/share/zoneinfo/"$TZ" /etc/localtime
# Copy the built .next folder from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the nextjs user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set environment variable for the port
ENV PORT 3000

# Command to run the app
CMD ["node", "server.js"]
