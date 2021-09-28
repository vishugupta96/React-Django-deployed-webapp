import random 
import string
ALPHANUMERIC_CHARACTER = string.ascii_lowercase + string.digits

STRING_LENGTH = 6

def generate_random_string(chars = ALPHANUMERIC_CHARACTER,length = STRING_LENGTH ):
    return ''.join(random.choice(chars)for i  in range(length))