package cn.edu.sustc.cse.ooad.sustechlambda.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.spec.SecretKeySpec

@Component
@ConfigurationProperties(prefix = "accesstoken")
class AccessTokenConfig(var signingKey: String = "") {

    fun getKey() = Base64.getDecoder().decode(signingKey).let {
        SecretKeySpec(it, 0, it.size, "HmacSHA384")
    }

}
