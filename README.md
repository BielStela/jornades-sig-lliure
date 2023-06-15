# Python as GIS workshop
To run the notebook we will need two environments. Almost everything can be ran with `environment11.yml`
 easily with docker if it is your friend.
```
docker compose up py11
```

The notebook `cogs.ipynb` needs a special environment because of a recent dependency update wreckage :(


```
docker compose up py9
```

or install directly fro file with 

```
mamba env create -f environment11.yml
```

### Some of the goodies we do at vizz 

[Cog Worker](https://vizzuality.github.io/cog_worker/)

[3d animated scenes](https://github.com/vizzTools/dem3d)

[Superresolution](https://github.com/Vizzuality/redes-data)