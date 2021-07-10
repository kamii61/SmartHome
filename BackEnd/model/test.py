# import numpy as np
import pandas as pd

df = pd.read_csv("../csv/dht-temp.csv");
print(df.shape)
df.head(3)