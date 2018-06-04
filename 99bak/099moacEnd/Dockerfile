
FROM sparkchain/ubuntu_jdk8_nodejs

COPY .  /app/
WORKDIR /app/
RUN npm install

EXPOSE 8200
# Define default command.
CMD ["npm", "start"]


#docker run -i -t sparkchain/ubuntu_moac_end /bin/bash
#docker run -d sparkchain/ubuntu_moac_end /bin/bash

#docker stop ubuntu_moac_end
#docker rm ubuntu_moac_end
#docker run -d --name ubuntu_moac_end -p 8200:8200 sparkchain/ubuntu_moac_end 
#docker logs -f  ubuntu_moac_end